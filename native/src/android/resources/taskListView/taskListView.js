import React, { Component } from 'react';
import {
  ListView,
  Text,
  View
} from 'react-native';


class TaskListView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {"id": 1, "name": "Do Dishes", "due": "Tomorrow"},
        {"id": 2, "name": "Wash Laundry", "due": "Friday"}
      ])
    };
  }
  render() {
    return (
      <View style={{paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <Text>
              {rowData.id} 
              {rowData.name} 
              {rowData.due}
            </Text>
          }
        />
      </View>
    );
  }
}

export default TaskListView;