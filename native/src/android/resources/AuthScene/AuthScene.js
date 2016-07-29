import React from 'react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

export default (props) => {
  var view;
  if (props.targetView === 'RegisterView') {
    view = (
      <RegisterView
        loginSuccess={props.loginSuccess}
        onPushRoute={props.onPushRoute}
        onPopRoute={props.onPopRoute}
        onSceneChange={props.onSceneChange} />
    );
  } else {
    view = (
      <LoginView
        loginSuccess={props.loginSuccess}
        onPushRoute={props.onPushRoute}
        onPopRoute={props.onPopRoute}
        onSceneChange={props.onSceneChange} />
    );
  }
  return view;
}
