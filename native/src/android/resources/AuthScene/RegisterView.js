import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { register } from './Auth';
import styles from '../../assets/styles.js';

export default class RegisterView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputs = {};
  }
  onChange(key, val) {
    this.inputs[key] = val;
  }
  onSubmit() {
    register(this.inputs).then(res => {
      if (res === true) {
        this.props.loginSuccess();
        this.props.onSceneChange({targetView: 'TaskView'});
      } else {
        // display some error form
      }
    });
  }
  onLoginClick() {
    this.props.onPushRoute({targetView: 'LoginView'});
  }
  render() {
    return (
      <View style={styles.login}>
        <Image source={require('../../assets/img/android-to-ios.png')} />
        <Image source={require('../../assets/img/rumi.png')} />
        <TextInput
          onChangeText={this.onChange.bind(this, 'name')}
          placeholder="full name"
          style={styles.loginInput} />
        <TextInput
          onChangeText={this.onChange.bind(this, 'email')}
          placeholder="email address"
          style={styles.loginInput} />
        <TextInput
          onChangeText={this.onChange.bind(this, 'password')}
          placeholder="password"
          secureTextEntry={true}
          style={styles.loginInput}/>
        <TouchableNativeFeedback onPress={this.onSubmit.bind(this)}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>CREATE YOUR ACCOUNT</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this.onLoginClick.bind(this)}>
          <View style={styles.p}>
            <Text>sign in with an existing account</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}
