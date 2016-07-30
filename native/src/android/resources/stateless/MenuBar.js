import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import MenuItem from './MenuItem.js';
import styles from '../../assets/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (props) => {
  return (
    <View style={styles.menu}>
      <MenuItem targetView={'TaskList'} title={'Open Tasks'} onPushRoute={props.onPushRoute} activeView={props.activeView} icon={'square-o'} />
      <MenuItem targetView={'CompletedTaskList'} title={'Closed Tasks'} onPushRoute={props.onPushRoute} activeView={props.activeView} icon={'check-square-o'} />
    </View>
  );
}
