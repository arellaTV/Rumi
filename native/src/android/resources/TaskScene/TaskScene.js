import React from 'react';
import { DrawerLayoutAndroid, Text } from 'react-native';
import AddTask from '../AddTask/AddTaskView';
import TappableRow from '../stateless/TappableRow';
import MenuBar from '../stateless/MenuBar';
import TaskList from '../taskListView/taskListView';

export default class TaskScene extends React.Component {
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <MenuBar />}>
        <Text>
          Route: {this.props.route.key}
        </Text>
        <TappableRow text="Task 1" onPress={this.props.onPushRoute}/>
        <TappableRow text="Task 2" onPress={this.props.onPushRoute}/>
        <TaskList />
        {/* Temp placed here*/}
      </DrawerLayoutAndroid>
    )
  }
}

// <AddTask />
