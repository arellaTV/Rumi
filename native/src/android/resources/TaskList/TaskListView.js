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
import TaskCategory from './TaskItem'

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
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([
        {"id": 1, "name": "Do Dishes", "due": "Tomorrow"},
        {"id": 2, "name": "Wash Laundry", "due": "Friday"}
      ]),
      overdueTasks: [],
      urgentTasks: [],
      upcomingTasks: [],
      completedTasks: []
    };
  }

  componentWillMount() {
    socket.emit('get all tasks');
  }

  componentDidMount() {
    socket.on('sending all tasks', (data) => {
      var sortedTasks = this.prioritizeTasks(data);
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        overdueTasks: sortedTasks.overdue,
        urgentTasks: sortedTasks.urgent,
        upcomingTasks: sortedTasks.upcoming
      });
    });
  }

  prioritizeTasks(allTasks) {
    let tasks = { upcoming: [], urgent: [], overdue: [] };
    let now = Date.now();

    allTasks.forEach(t => {
      let timeLeft = Date.parse(t.dueBy) - now;

      if (timeLeft < 0) {
        return tasks.overdue.push(t);
      } else if (timeLeft < t.interval / 2) {
        return tasks.urgent.push(t);
      } else {
        return tasks.upcoming.push(t);
      }
    });

    return tasks;
  }

  onDismissal(e) {
    socket.emit('get all tasks');
    socket.on('sending all tasks', (data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === e.id) {
          data.splice(i, 1);
        }
      }
      this.state.completedTasks.unshift(e);
      this.setState({
        dataSource: this.ds.cloneWithRows(data),
        completedTasks: this.state.completedTasks
      });
    });
  }

  render() {
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

      <Text>Completed</Text>
        <TaskCategory category={this.state.completedTasks}/>
      <Text>Overdue</Text>
        <TaskCategory category={this.state.overdueTasks}/>
      <Text>Urgent</Text>
        <TaskCategory category={this.state.urgentTasks}/>
      <Text>Upcoming</Text>
        <TaskCategory category={this.state.upcomingTasks}/>
      </View>
    );
  }
}

export default TaskListView;
