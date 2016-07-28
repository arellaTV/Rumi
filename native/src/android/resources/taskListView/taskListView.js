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
      ])
    };
  }

  componentWillMount() {
    socket.emit('get all tasks');
  }

  componentDidMount() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    socket.on('sending all tasks', (data) => {
      console.log('emitting from task lists', data);
      this.setState({
        dataSource: ds.cloneWithRows(data)
      });
    });
  }

  onDismissal(e) {
    console.log('dismissed!', e);
    
  }

  render() {
    return (
      <View style={styles.taskList}>
        <ListView
          dataSource={this.state.dataSource}
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
              <TouchableHighlight onPress={this.onDismissal.bind(this, rowData.id)}>
                <Text>dismiss</Text>
              </TouchableHighlight>
            </View>
          }
        />
      </View>
    );
  }
}

export default TaskListView;
