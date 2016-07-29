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
import styles from '../../assets/styles.js';

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
