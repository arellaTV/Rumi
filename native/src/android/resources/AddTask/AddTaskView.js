import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TextInput, 
  Picker, 
  TouchableNativeFeedback, 
  TouchableHighlight,
  Image } from 'react-native';

import socket from '../../socketClient';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: '0',
      recurranceVal: 0,
      name: '',
      duedate: '',
      details: '',
      taskInterval: 0,
      modalVisible: false
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible}); 
  }

  onSubmit() {
    this.calcDueDateAndInterval();
    // insert socket emit logic here

    socket.emit('create task', {
      name: this.state.name,
      dueBy: this.state.duedate,
      interval: this.state.taskInterval
    });
  }

  render() {
    return (
      <View>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>

        </View>
        <View style={styles.modal}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            
            <Text style={styles.newTask}>New Task</Text>

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

          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center', 
    backgroundColor: 'lightgrey'
  },
  newTask: {
    margin: 10, 
    fontSize: 24, 
    textAlign: 'right'
  },
  input: {
    width: 300
  },
  recurrance: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default AddTask;
