import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from '../../assets/styles.js';
import { getSocket } from '../../socketClient';
import getToken from '../AuthScene/Auth';
import Task from './TaskItem';


class TaskListView extends Component {
  constructor(props) {
    super(props);
    this.socket = getSocket();
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
    this.socket.emit('get all tasks');
  }

  componentDidMount() {
    this.socket.on('sending all tasks', (data) => {
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

  onDismissal(id) {
    this.socket.emit('complete task', id);
    this.socket.emit('archive task', id);
    this.socket.emit('get all tasks');
    // this.setState({
    //   currentCategory: currentCategory
    // })
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
                var categoryName = <Text style={styles.categoryName}>{categoryNames[row]}</Text>;
              }
              return (
                <View >
                  <Text style={styles.categoryName}> {categoryName} </Text>
                    {category.filter(task => !task.isArchived).map((task, index) =>
                      <Task task={task} onDismissal={this.onDismissal.bind(this, task.id)} key={task.id}/>
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
