import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import styles from '../../assets/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (props) => {
  return (
    <View style={styles.menu}>
      {/** Refactor these into menuItems **/}
      <View>
        <TouchableNativeFeedback
          onPress={props.onPushRoute.bind(null, {targetView: 'TaskList'})}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.indivMenu}>
            <Icon name="square-o" size={40} color="#7AD05D" />
            <Text style={styles.menuText}>Open Tasks</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View>
        <TouchableNativeFeedback
          onPress={props.onPushRoute.bind(null, {targetView: 'CompletedTaskList'})}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.indivMenu}>
            <Icon name="check-square-o" size={40} color="#7AD05D" />
            <Text style={styles.menuText}>Closed Tasks</Text>
          </View>
        </TouchableNativeFeedback>
    </View>
    </View>
  );
}