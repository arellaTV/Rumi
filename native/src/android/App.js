import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  NavigationExperimental as Navigator,
  TouchableHighlight,
  Text
} from 'react-native';

import MenuBar from './resources/stateless/MenuBar';
import TaskList from './resources/TaskList/TaskListView';

class TappableRow extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="#D0D0D0"
        onPress={this.props.onPress}>
        <Text>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    )
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      navigationState: {
        index: 0,
        routes: [{key: 'Task List'}]
      }
    };
  }

  _onNavigationChange(type) {
    let {navigationState} = this.state;
    switch(type) {
      case 'push':
        const route = {key: 'Route-' + Date.now()};
        navigationState = NavigationStateUtils.push(navigationState, route);
        break;
      case 'pop':
        navigationState = NavigationStateUtils.pop(navigationState);
        break;
    }
    if (this.state.navigationState !== navigationState) {
      this.setState(navigationState);
    }
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <MenuBar />}>
        <Text>
          Route: {this.state.navigationState.routes[this.state.navigationState.index].key}
        </Text>
        <TappableRow text="Tap me to go to next screen" onPress={() => console.log('pressme')}/>
        <TappableRow text="Tap me to go back" onPress={() => console.log('pressme')}/>
        <TaskList />
      </DrawerLayoutAndroid>
    );
  }
}

export default App;
