import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
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


class TaskListView extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([
        {"id": 1, "name": "Do Dishes", "due": "Tomorrow"},
        {"id": 2, "name": "Wash Laundry", "due": "Friday"}
      ])
    };
  }

  render() {
    return (
      <View style={styles.taskList}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <TouchableNativeFeedback
              onPress={this._onPressButton}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <View style={styles.taskCard}>
                <Text style={styles.titleText}> {rowData.name} </Text>
                <Text style={styles.baseText}> Due: {rowData.due} </Text>
                <Text style={styles.baseText}> Last completed by NAME </Text>
              </View>
            </TouchableNativeFeedback>
          }
        />
      </View>
    );
  }
}

export default TaskListView;