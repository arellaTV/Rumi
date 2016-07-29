import {
  AsyncStorage
} from 'react-native';

var login = function(userInfo) {
  console.log(userInfo);
  return fetch('http://192.168.56.1:3000/auth/local', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  }).then((res) => {
    return res.json();
  }).then(token => {
    return AsyncStorage.setItem('@Rumi:token', token);
  }).then(() => {
    return true;
  }).catch(err => {
    console.log(err);
  });
};

var getToken = function() {
  return AsyncStorage.getItem('@Rumi:token');
};

export { login, getToken };
