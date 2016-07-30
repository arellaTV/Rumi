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
import Icon from 'react-native-vector-icons/FontAwesome';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const Task = (props) => (
  <View>
    <TouchableNativeFeedback
      onPress={props._onPressButton}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={styles.taskCard}>
        <Text style={styles.titleText}> {props.task.name} </Text>
        <View style={styles.taskElements}>
          <View style={styles.taskText}>
            <Text style={styles.baseText}> Due: {props.task.dueBy} </Text>
            
            <Text style={styles.baseText}> Last completed by NAME </Text>
          </View>
          <TouchableHighlight onPress={props.onDismissal} >
            <Icon name="square-o" size={40} color="#28BF32" />
          </TouchableHighlight>
        </View>
      </View>
    </TouchableNativeFeedback>
    
  </View>
)

export default Task;
