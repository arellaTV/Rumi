import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Picker, TouchableNativeFeedback, Image } from 'react-native';
var socket = require('socket.io-client')();

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: '0',
      recurranceVal: 0,
      name: '',
      duedate: '',
      details: '',
      taskInterval: 0
    }
  }

  calcDueDateAndInterval() {
    let hours = n => 1000*60*60*n;
    let days = n => hours(n) * 24;

    let n = Number(this.state.interval);

    // 1 = hours; 2 = days
    if (this.state.intervalVal === 1) {
      this.state.taskInterval = hours(n);
    } else if (this.state.intervalVal === 2) {
      this.state.taskInterval = days(n);
    }

    this.state.duedate = new Date(Date.now() + this.state.taskInterval);
  }

  onSubmit() {
    this.calcDueDateAndInterval();
    // insert socket emit logic here
    socket.emit('message', 'testing!');
  }

  render() {
    return (
      <View style={{alignItems: 'center', backgroundColor: 'lightgrey'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>New Task</Text>

        <Text>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({name: text})}/>

        <Text>Recurrance:</Text>
          <View style={styles.recurrance}>
            <TextInput
              style={{width: 50}}
              keyboardType = 'numeric'
              onChangeText={(num) => this.setState({interval: num})}/>
            <Picker
              style={{width: 100}}
              selectedValue={this.state.recurranceVal}
              onValueChange={(val) => this.setState({recurranceVal: val})}>
              <Picker.Item label='hour(s)' value={0} />
              <Picker.Item label='day(s)' value={1} />
            </Picker>
          </View>

        <Text>Details:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({details: text})}
            multiline={true}/>
          <TouchableNativeFeedback onPress={this.onSubmit.bind(this)}>
            <View style={{width: 50, height: 25, backgroundColor: 'grey'}}></View>
          </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 300
  },
  recurrance: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default AddTask;
