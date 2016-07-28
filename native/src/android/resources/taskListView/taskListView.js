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


class TaskListView extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {"id": 1, "name": "Do Dishes", "due": "Tomorrow"},
        {"id": 2, "name": "Wash Laundry", "due": "Friday"}
      ]),
      completedTasks: []
    };
  }

  componentWillMount() {
    socket.emit('get all tasks');
  }

  componentDidMount() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    socket.on('sending all tasks', (data) => {
      this.setState({
        dataSource: ds.cloneWithRows(data)
      });
    });
  }

  onDismissal(e) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    socket.emit('get all tasks');
    socket.on('sending all tasks', (data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === e.id) {
          data.splice(i, 1);
        }
      }
      this.state.completedTasks.unshift(e);
      this.setState({
        dataSource: ds.cloneWithRows(data),
        completedTasks: this.state.completedTasks
      });
    });
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.taskList}>

        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData) =>
            <View>
              <TouchableNativeFeedback
                onPress={this._onPressButton}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.taskCard}>
                  <Text style={styles.titleText}> {rowData.name} </Text>
                  <Text style={styles.baseText}> Due: {rowData.dueBy} </Text>
                  <Text style={styles.baseText}> Last completed by NAME </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableHighlight onPress={this.onDismissal.bind(this, rowData)}>
                <Text>dismiss</Text>
              </TouchableHighlight>
            </View>
          }
        />
        <ListView
          dataSource={ds.cloneWithRows(this.state.completedTasks)}
          enableEmptySections={true}
          renderRow={(rowData) =>
            <View>
              <TouchableNativeFeedback
                onPress={this._onPressButton}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.taskCard}>
                  <Text style={styles.titleText}> {rowData.name} </Text>
                  <Text style={styles.baseText}> Due: {rowData.dueBy} </Text>
                  <Text style={styles.baseText}> Last completed by NAME </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          }
        />
      </View>
    );
  }
}

export default TaskListView;
