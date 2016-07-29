import React from 'react';
import {
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';

export default class RegisterView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputs = {};
  }
  onChange(key, val) {
    this.inputs[key] = val;
  }
  onSubmit() {
    // login(this.inputs).then(res => {
    //   if (res === true) {
    //     this.props.loginSuccess();
    //     this.props.onSceneChange({key: 'Task View'});
    //   } else {
    //     // display some error form
    //   }
    // });
  }
  render() {
    return (
      <View>
        <Text>Name:</Text>
        <TextInput
          onChangeText={this.onChange.bind(this, 'name')} />
        <Text>Email:</Text>
        <TextInput
          onChangeText={this.onChange.bind(this, 'email')} />
        <Text>Password:</Text>
        <TextInput
          onChangeText={this.onChange.bind(this, 'password')} />
        <TouchableNativeFeedback onPress={this.onSubmit.bind(this)}>
          <View style={{width: 50, height: 25, backgroundColor: 'grey'}}>
            <Text>Submit</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{width: 50, height: 25, backgroundColor: 'grey'}}>
            <Text>Already have a user? Sign in..</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}
