import React from 'react';
import {
  AsyncStorage,
  Image,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';

import { login, getToken } from './Auth';

const {
  LoginButton
} = 'react-native-fbsdk';

export default class LoginView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputs = {};
  }
  onChange(key, val) {
    this.inputs[key] = val;
  }
  onSubmit() {
    login(this.inputs).then(res => {
      if (res === true) {
        this.props.loginSuccess().then(() => {
          this.props.onSceneChange({targetView: 'TaskView'});
        });
      } else {
        // display some error form
      }
    });
  }
  onRegisterClick() {
    this.props.onPushRoute({targetView: 'RegisterView'});
  }
  render() {
    return (
      <View>
        <Image
          source={require('../../assets/img/android-to-ios.png')}
        />
        <Image
          source={require('../../assets/img/rumi.png')}
        />
        <TextInput
          onChangeText={this.onChange.bind(this, 'email')}
          placeholder="email address"/>
        <TextInput
          onChangeText={this.onChange.bind(this, 'password')} 
          placeholder="password"/>
        <TouchableNativeFeedback onPress={this.onSubmit.bind(this)}>
          <View style={{width: 50, height: 25, backgroundColor: 'grey'}}>
            <Text>Login</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this.onRegisterClick.bind(this)}>
          <View style={{width: 50, height: 25, backgroundColor: 'grey'}}>
            <Text>Register</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}
