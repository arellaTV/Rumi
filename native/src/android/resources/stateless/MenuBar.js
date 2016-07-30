import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';

const styles = StyleSheet.create({
  taskList: {
    backgroundColor: '#EAEAEA',
    flex: 2,
    alignItems: 'stretch',
  },
  taskCard: {
    backgroundColor: '#fff',
    flex: 2,
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  baseText: {
    fontSize: 20,
  },
});
export default (props) => {
  return (
    <View>
      {/** Refactor these into menuItems **/}
      <TouchableNativeFeedback
        onPress={props.onPushRoute.bind(null, {targetView: 'TaskList'})}
        style={styles.taskCard}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View>
          <Text>Open Tasks</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={props.onPushRoute.bind(null, {targetView: 'CompletedTaskList'})}
        style={styles.taskCard}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View>
          <Text>Closed Tasks</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

// export default class NavigationView extends React.Component {
//   render() {
//     return (
//
//     );
//   }
// };
