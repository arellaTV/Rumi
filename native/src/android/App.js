import React, { Component } from 'react';
import {
  BackAndroid,
  DrawerLayoutAndroid,
  NavigationExperimental as Navigator,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import MenuBar from './resources/stateless/MenuBar';
import TaskList from './resources/TaskList/TaskListView';

var {
  CardStack,
  StateUtils
} = Navigator;

class TappableRow extends React.Component {
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

class TaskScene extends Component {
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
      </DrawerLayoutAndroid>
    )
  }
}

class Router extends Component {
  constructor(props, context) {
    super(props, context);
    // Goes backwards on screnes until back to main page
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.navigationState.routes.length === 1) {
        return false;
      }
      this._onPopRoute();
      return true;
    });

    this._onPushRoute = this.props.onNavigationChange.bind(null, 'push');
    this._onPopRoute = this.props.onNavigationChange.bind(null, 'pop');
    // bind your functions in the constructor
    // this makes it so you don't have to worry about it elsewhere
    this._renderScene = this._renderScene.bind(this);
  }
  render() {
    // creates a navigator that pops on backbutton
    return (
      <CardStack
        onNavigateBack={this._onPopRoute}
        navigationState={this.props.navigationState}
        renderScene={this._renderScene}
        />
      );
  }
  _renderScene(sceneProps) {
    return (
      <TaskScene
        route={sceneProps.scene.route}
        onPushRoute={this._onPushRoute}
        onPopRoute={this._onPopRoute}
        onExit={this.props.onExit}
      />
    );
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
    this._onNavigationChange = this._onNavigationChange.bind(this);
  }

  _onNavigationChange(type) {
    let {navigationState} = this.state;
    switch(type) {
      case 'push':
        const route = {key: 'Route-' + Date.now()};
        navigationState = StateUtils.push(navigationState, route);
        break;
      case 'pop':
        navigationState = StateUtils.pop(navigationState);
        break;
    }
    if (this.state.navigationState !== navigationState) {
      this.setState({navigationState});
    }
  }

  render() {
    return (
      <Router
        onNavigationChange={this._onNavigationChange}
        navigationState={this.state.navigationState}
      />
    );
  }
}

export default App;
