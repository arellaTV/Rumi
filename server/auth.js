let express = require('express');

let User = require('./models/User');
let OAuth = require('./models/OAuth');

var nJwt = require('njwt');
var secureRandom = require('secure-random');

// signing key is only stored in memory
// if the server restarts, all users must sign back in.
// This can be resolved by sharing the signingKey between a cluster
// of servers securely. (Imagine a redux store for server clusters)
var signingKey = secureRandom(256, {type: 'Buffer'});

var createToken = function(email) {
  var claims = {
    iss: '138.68.14.133:3000',
    sub: email
  };
  var jwt = nJwt.create(claims, signingKey);
  return jwt.compact();
};

var verifyToken = function(token) {
  return new Promise((resolve, reject) => {
    nJwt.verify(token, signingKey, (err, verifiedJwt) => {
      err ? reject(err) : resolve(verifiedJwt);
    });
  });
};

var getUserFromToken = function(jwt) {
  return User.findByEmail(jwt.body.sub);
};

var login = function(email, password) {
  return new Promise(function(resolve, reject) {
    User.findByEmail(email).then(user => {
      if (!user) {
        console.error('user does not exist in the database');
        reject('user does not exist');
      } else {
        user.verifyPassword(password).then(verified => {
          if (verified) {
            var token = createToken(email);
            resolve(token);
          } else {
            reject('incorrect password');
          }
        });
      }
    });
  });
};

var register = function(info) {
  return new Promise(function(resolve, reject) {
    User.findByEmail(info.email).then(user => {
      if (user) {
        reject(user);
      } else {
        User.create({
          name: info.name,
          email: info.email,
          password: info.password
        }).then(user => {
          resolve(createToken(info.email));
        });
      }
    });
  });
}

// passport.use(new FacebookStrategy({
//   clientID: process.env.FB_ID,
//   clientSecret: process.env.FB_SECRET,
//   callbackURL: '/auth/facebook/return'
// }, function(accessToken, refreshToken, profile, done) {
//     // what if user exists in user table
//     // but first time logging in with fb?
//     // current logic would create a duplicate user in user table
//     OAuth.findOne({where: {
//       oauthId: profile.id,
//       oauthType: 'facebook'
//     }})
//     .then(oauth => {
//       if (!oauth) {
//         User.create({
//           name: profile.displayName,
//           email: 'na',   // ???
//           password: 'na' // ???
//         })
//         .then((user) => {
//           OAuth.create({
//             oauthId: profile.id,
//             oauthType: profile.provider,
//             userId: user.id
//           });
//           done(null, user);
//         });
//       } else {
//         User.findOne({where: {
//           id: oauth.userId
//         }})
//         .then(user => {
//           done(null, user);
//         });
//       }
//     });
// }));

let routes = express.Router();

routes.post('/auth/local', (req, res) => {
  login(req.body.email, req.body.password).then((token) => {
    res.send(JSON.stringify(token));
  }).catch((err) => {
    res.send(err);
  });
});

routes.post('/auth/local/register', (req, res) => {
  register(req.body).then(token => {
    res.send(JSON.stringify(token));
  }).catch(err => {
    res.send(err);
  });
});

routes.get('/auth/facebook', (req, res) => {
  // add in the token verificaiton for android
});

routes.get('/auth/facebook/return', () => {
  // add in token verification?
});

routes.get('/logout', (req, res) => {
  // why bother
});

function isAuth(req, res, next) {
  if (req.headers.authorization) {
    // gets the token from the Bearer <token> format
    var token = req.headers.authorization.split(' ')[1];
  }
  verifyToken(token).then(token => {
    next();
  }).catch(err => {
    res.send('reauthorize');
  });
}

module.exports = {
  routes,
  getUserFromToken,
  isAuth,
  verifyToken
};
