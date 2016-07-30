import React from 'react';
import { DrawerLayoutAndroid, Text } from 'react-native';
import AddTask from '../AddTask/AddTaskView';
import TappableRow from '../stateless/TappableRow';
import MenuBar from '../stateless/MenuBar';
import TaskList from '../TaskList/TaskListView';
import CompletedTaskList from '../CompleteTask/CompleteTaskListView';

export default class TaskScene extends React.Component {
  getView(targetView) {
    var view;
    if (targetView === 'CompletedTaskList') {
      view = (
        <CompletedTaskList />
      );
    } else if (targetView === 'TaskList') {
      view = (
        <TaskList />
      );
    } else {
      view = (
        <TaskList />
      );
    }
    return view;
  }
  render() {
    var view = this.getView(this.props.targetView);
    return (
      <DrawerLayoutAndroid
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <MenuBar onPushRoute={this.props.onPushRoute} activeView={this.props.targetView} />}>
        {view}
        <AddTask/>
      </DrawerLayoutAndroid>
    );
  }
}
