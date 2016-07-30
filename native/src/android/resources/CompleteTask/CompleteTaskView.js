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
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.socket = getSocket();
    this.state = {
      completedTasks: [
        {"id": 1, "name": "Do Dishes", "due": "Tomorrow"},
        {"id": 2, "name": "Wash Laundry", "due": "Friday"}
      ]
    };
  }

  componentWillMount() {
    this.socket.emit('get all tasks');
  }

  componentDidMount() {
    this.socket.on('complete task', (data) => {
      this.setState({
        completedTasks: data
      });
    });
  }

  onDismissal(index) {
    this.state.completedTasks.splice(index, 1);
    this.setState({
      completedTasks: this.state.completedTasks
    })
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
                  <Task task={task} onDismissal={this.onDismissal.bind(this, index)}/>
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
