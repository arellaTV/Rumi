import React from 'react';
import { DrawerLayoutAndroid, Text } from 'react-native';
import AddTask from '../AddTask/AddTaskView';
import TappableRow from '../stateless/TappableRow';
import MenuBar from '../stateless/MenuBar';
import TaskList from '../TaskList/TaskListView';
import CompletedTaskList from '../CompleteTask/CompleteTaskView';

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
    var view = getView(props.targetView);
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <MenuBar />}>
        {view}
      </DrawerLayoutAndroid>
    );
  }
}
