import React, { Component } from 'react';
import {
  Navigator,
  DrawerLayoutAndroid
} from 'react-native';
import MenuBar from './resources/stateless/MenuBar';
import TaskList from './resources/TaskList/TaskListView';

class App extends Component {
  render() {
    return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Right}
      renderNavigationView={() => <MenuBar />}>
      <TaskList />
    </DrawerLayoutAndroid>
    );
  }
}

export default App;
