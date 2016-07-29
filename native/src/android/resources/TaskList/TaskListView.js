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
import Task from './TaskItem'

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
    var tasks = [this.state.overdueTasks, this.state.urgentTasks, this.state.upcomingTasks];
    var categoryNames = ['Overdue:', 'Urgent:', 'Upcoming:']
    return (
      <View style={styles.taskList}>
        <ListView
          dataSource={this.ds.cloneWithRows(tasks)}
          enableEmptySections={true}
          renderRow={
            (category, section, row) => {
              if (category.length) {
                var categoryName = <Text>{categoryNames[row]}</Text>;
              }
              return (
                <View>
                  {categoryName}
                  {category.map((task) =>
                    <Task task={task}/>
                  )}
                </View>
              );
            }
          }
        />
      </View>
    );
  }
}

export default TaskListView;
