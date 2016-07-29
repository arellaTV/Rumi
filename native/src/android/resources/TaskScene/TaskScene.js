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
    var view = this.getView(this.props.targetView);
    return (
      <DrawerLayoutAndroid
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <MenuBar onPushRoute={this.props.onPushRoute} />}>
        {view}
        renderNavigationView={() => <MenuBar />}>
        <TaskList />
        <Text>
          Route: {this.props.route.key}
        </Text>
        <TappableRow text="Task 1" onPress={this.props.onPushRoute}/>
        <TappableRow text="Task 2" onPress={this.props.onPushRoute}/>
        <TaskList />
        <AddTask />
        {/* Temp placed here*/}
      </DrawerLayoutAndroid>
    );
  }
}
