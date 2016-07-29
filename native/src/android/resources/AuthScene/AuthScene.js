import React from 'react';
import {
  AsyncStorage,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';
import FBSDK from 'react-native-fbsdk';

const {
  LoginButton
} = 'react-native-fbsdk';

var login = function(userInfo) {
  console.log(userInfo);
  fetch('http://192.168.56.1:3000/auth/local', {
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
  }).catch(err => {
    console.log(err);
  });
};

var getToken = function() {
  return AsyncStorage.getItem('@Rumi:token');
};

export { getToken };

export default class AuthScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputs = {};
  }
  onChange(key, val) {
    this.inputs[key] = val;
  }
  onSubmit() {
    login(this.inputs);
  }
  render() {
    return (
      <View>
        <Text>Email:</Text>
        <TextInput
          onChangeText={this.onChange.bind(this, 'email')} />
        <Text>Password:</Text>
        <TextInput
          onChangeText={this.onChange.bind(this, 'password')} />
        <TouchableNativeFeedback onPress={this.onSubmit.bind(this)}>
          <View style={{width: 50, height: 25, backgroundColor: 'grey'}}>
            <Text>Login</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}
