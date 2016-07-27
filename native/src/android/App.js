import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  DrawerLayoutAndroid
} from 'react-native';
import MenuBar from './resources/stateless/MenuBar';

class App extends Component {
  render() {
    return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Right}
      renderNavigationView={MenuBar}>
      {/* Temporary 'Main' component */}
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
      </View>
    </DrawerLayoutAndroid>
    );
  }
}

export default App;
