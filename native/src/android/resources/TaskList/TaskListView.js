import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export default class TaskList extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Task</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
      </View>
    );
  }
}
