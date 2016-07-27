import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class AddTask extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>New Task</Text>
      </View>
    );
  }
}

export default AddTask;
