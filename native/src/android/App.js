import React, { Component } from 'react';
import TaskScene from './resources/TaskScene/TaskScene';
import {
  BackAndroid,
  NavigationExperimental as Navigator,
  Text
} from 'react-native';

var {
  CardStack,
  StateUtils
} = Navigator;

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
    if (!this.props.loggedIn) {
      return (
        <Text>{'You aren\'t logged in, yo!'}</Text>
      )
    } else {
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
