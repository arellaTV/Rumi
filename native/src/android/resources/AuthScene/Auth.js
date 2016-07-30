import {
  AsyncStorage
} from 'react-native';
import host from '../../env.js';

var login = function(userInfo) {
  return fetch(host + '/auth/local', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  }).then((res) => {
    return res.json();
  }).then(token => {
    console.log(token);
    return AsyncStorage.setItem('@Rumi:token', token);
  }).then(() => {
    return true;
  }).catch(err => {
    console.log(err);
  });
};

var register = function(userInfo) {
  return fetch(host + '/auth/local/register', {
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

export { login, getToken, register };
