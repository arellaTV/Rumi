import React, { Component } from 'react';
import {
  BackAndroid,
  NavigationExperimental as Navigator,
  Text
} from 'react-native';
import { getToken } from './resources/AuthScene/Auth';
import { connectSocket } from './socketClient';
import TaskScene from './resources/TaskScene/TaskScene';
import AuthScene from './resources/AuthScene/AuthScene';

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
    this._onSceneChange = this.props.onNavigationChange.bind(null, 'sceneChange');
    // bind your functions in the constructor
    // this makes it so you don't have to worry about it elsewhere
    this._renderScene = this._renderScene.bind(this);
  }
  render() {
    return (
      <CardStack
        onNavigateBack={this._onPopRoute}
        navigationState={this.props.navigationState}
        renderScene={this._renderScene}
        />
      );
  }
  _renderScene(sceneProps) {
    var targetView = sceneProps.scene.route.targetView;
    if (!this.props.loggedIn) {
      return (
        <AuthScene
          targetView={targetView}
          loginSuccess={this.props.onLoginSuccess}
          onPushRoute={this._onPushRoute}
          onPopRoute={this._onPopRoute}
          onSceneChange={this._onSceneChange} />
      );
    } else {
      return (
        <TaskScene
          targetView={targetView}
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
        routes: [{key: 'Init', targetView: 'LoginView'}]
      },
      loggedIn: false
    };
    this._onNavigationChange = this._onNavigationChange.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  onLoginSuccess() {
    return getToken()
      .then((token) => connectSocket(token))
      .then(() => {
        this.setState(Object.assign({}, this.state, {loggedIn: true}))
      });
  }

  _onNavigationChange(type, route) {
    let {navigationState} = this.state;
    var route = route || {};
    route.key = 'Route at: ' + Date.now();
    switch(type) {
      case 'push':
        navigationState = StateUtils.push(navigationState, route);
        break;
      case 'pop':
        navigationState = StateUtils.pop(navigationState);
        break;
      case 'sceneChange':
        navigationState = {index: 0, routes: [route]};
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
        onLoginSuccess={this.onLoginSuccess}
        loggedIn={this.state.loggedIn}
        navigationState={this.state.navigationState}
      />
    );
  }
}

export default App;
