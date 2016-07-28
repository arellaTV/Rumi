import React from 'react';
import {
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';

var login = function() {
  
};

export default class AuthScene extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputs = {};
  }
  onChange(key, val) {
    this.inputs[key] = val;
  }
  onSubmit() {
    console.log(this.inputs);
  }
  render() {
    return (
      <View>
        <Text>Username:</Text>
        <TextInput
          onChangeText={this.onChange.bind(this, 'username')} />
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
