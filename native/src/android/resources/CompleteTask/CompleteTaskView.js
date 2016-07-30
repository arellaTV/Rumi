import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { getSocket } from '../../socketClient';
import Task from '../TaskList/TaskItem';
import styles from '../../assets/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

class CompleteTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedTasks: []
    };
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.socket = getSocket();
    this.socket.emit('get completeds');
    this.socket.on('sending completeds', (data) => {
      this.setState({
        completedTasks: data
      });
    });
  }

  render() {
    return (
      <View style={styles.taskList}>
        <ListView
          dataSource={this.ds.cloneWithRows(this.state.completedTasks)}
          enableEmptySections={true}
          renderRow={
            (task, section, index) => {
              return (
                <View>
                  <Text>Completed Tasks</Text>
                  <Task task={task} />
                </View>
              );
            }
          }
        />
      </View>
    );
  }
}

export default CompleteTask;
