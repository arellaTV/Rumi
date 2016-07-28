import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  View
} from 'react-native';
import socket from '../../socketClient';

const styles = StyleSheet.create({
  taskList: {
    backgroundColor: '#EAEAEA',
    flex: 2,
    alignItems: 'stretch',
  },
  taskCard: {
    backgroundColor: '#fff',
    flex: 2,
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  baseText: {
    fontSize: 20,
  },
});

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const Task = (props) => (
  <View>
    <TouchableNativeFeedback
      onPress={props._onPressButton}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={styles.taskCard}>
        <Text style={styles.titleText}> {props.task.name} </Text>
        <Text style={styles.baseText}> Due: {props.task.dueBy} </Text>
        <Text style={styles.baseText}> Last completed by NAME </Text>
      </View>
    </TouchableNativeFeedback>
    <TouchableHighlight onPress={props.onDismissal}>
      <Text>dismiss</Text>
    </TouchableHighlight>
  </View>
)

export default Task;
