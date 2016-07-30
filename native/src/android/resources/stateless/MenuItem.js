import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import styles from '../../assets/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (props) => {
  console.log(props);
  return (
    <View >
        <TouchableNativeFeedback
          onPress={props.onPushRoute.bind(null, {targetView: props.targetView})}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={props.targetView === props.activeView ? styles.indivMenuActive : styles.indivMenu}>
            <Icon name={props.icon} size={40} color={props.targetView === props.activeView ? '#EAEAEA' : "#7AD05D"} />
            <Text style={styles.menuText}>{props.title}   </Text>
          </View>
        </TouchableNativeFeedback>
    </View>
  );
}
