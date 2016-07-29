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
import styles from '../../assets/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    };
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
    socket.emit('get all tasks');
  }

  render() {
    return (
      <View style={styles.footer}>
        <TouchableHighlight  onPress={() => {
          this.setModalVisible(true)
        }}>
          <View style={styles.showModal}>
            <Icon name="plus" size={40} color="#EAEAEA" />
          </View>
        </TouchableHighlight>

        <View>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={styles.modalHeader}>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text style={styles.hideModal}> Cancel </Text>
              </TouchableHighlight>
              <Text style={styles.newTaskTitle}>New Task</Text>
              <TouchableNativeFeedback onPress={() => {
                  this.onSubmit.bind(this);
                  this.setModalVisible(!this.state.modalVisible);
                }
              }>
                <View>
                  <Text style={styles.submitTask}>Save</Text>
                </View>
              </TouchableNativeFeedback>

              </View>
            <View  style={styles.modal}>


            </View>

            <View style={styles.modal}>
              <Text style={styles.title}>Name:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({name: text})}/>

              <Text style={styles.title}>Recurrance:</Text>
                <View style={styles.recurrance}>
                  <TextInput
                    style={{width: 100}}
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

              <Text style={styles.title}>Details:</Text>

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({details: text})}
                multiline={true}/>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}



export default AddTask;
