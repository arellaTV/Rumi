import React from 'react';
import { DrawerLayoutAndroid, Text } from 'react-native';
import AddTask from '../AddTask/AddTaskView';
import TappableRow from '../stateless/TappableRow';
import MenuBar from '../stateless/MenuBar';
import TaskList from '../TaskList/TaskListView';
import CompleteTask from '../CompleteTask/CompleteTaskView';

export default class TaskScene extends React.Component {
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <MenuBar />}>
        <TaskList />
        {/* Temp placed here*/}
      </DrawerLayoutAndroid>
    )
  }
}
