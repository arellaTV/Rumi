import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  View
} from 'react-native';
import styles from '../../assets/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimeAgo from 'react-native-timeago'

class CompletedTask extends React.Component {
  render() {
    var props = this.props;
    var task = props.data.task;
    var user = props.data.user;
    return (
      <View style={styles.taskCard}>
        <Text style={styles.titleText}> {task.name} </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 50}}>
            <Icon name="check-square-o" size={40} color="#28BF32" />
          </View>
          <View style={{flexDirection: 'column'}}> 
            <Text style={styles.baseText}> Completed: <TimeAgo time={task.updatedAt} /> </Text>
            <Text style={styles.baseText}> Thanks to: {user.name} </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default CompletedTask;
