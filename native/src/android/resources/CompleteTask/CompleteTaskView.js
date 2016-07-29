import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import socket from '../../socketClient';
import Task from '../TaskList/TaskItem'

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


class CompleteTask extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      completedTasks: []
    };
  }

  componentWillMount() {
    socket.emit('get all tasks');
  }

  componentDidMount() {
    socket.on('complete task', (data) => {
      this.setState({
        completedTasks: data
      });
    });
  }

  onDismissal(index, row) {
    var tasks = [this.state.overdueTasks, this.state.urgentTasks, this.state.upcomingTasks];
    var currentCategory = tasks[row];
    currentCategory.splice(index, 1);
    this.setState({
      currentCategory: currentCategory
    })
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
                  {category.map((task, index) =>
                    <Task task={task} onDismissal={this.onDismissal.bind(this, index, row)} key={index}/>
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

export default CompleteTask;
