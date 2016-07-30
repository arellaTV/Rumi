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

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Task extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onDismissal = this.onDismissal.bind(this);
    this.state = { completed: false };
  }
  onDismissal() {
    this.setState({ completed: true });
    this.props.onDismissal();
  }
  render() {
    var props = this.props;
    return (
      <View>
        <TouchableNativeFeedback
          onPress={props._onPressButton}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.taskCard}>
            <Text style={styles.titleText}> {props.task.name} </Text>
            <View style={styles.taskElements}>
              <View style={styles.taskText}>
                <Text style={styles.baseText}> Due: <TimeAgo time={props.task.dueBy} /> </Text>
              </View>
              <TouchableHighlight onPress={this.onDismissal} >
                {
                  this.state.completed ?
                  <Icon name="check-square-o" size={40} color="#28BF32" />
                  :
                  <Icon name="square-o" size={40} color="#28BF32" />
                }
              </TouchableHighlight>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

export default Task;
