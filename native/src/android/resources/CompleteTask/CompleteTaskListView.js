import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CompletedTask from './CompletedTaskItem';
import { getSocket } from '../../socketClient';
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
        <Text style={styles.categoryName}>Completed Tasks</Text>
        <ListView
          dataSource={this.ds.cloneWithRows(this.state.completedTasks)}
          enableEmptySections={true}
          renderRow={
            (data, section, index) => {
              if (data.task) {
                return (
                  <View >
                  <CompletedTask data={data} />
                  </View>
                );
              } else {
                return (
                  <View></View>
                );
              }
            }
          }
        />
      </View>
    );
  }
}

export default CompleteTask;
