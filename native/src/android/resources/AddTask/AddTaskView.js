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

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#252A34',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  showModal: {
    textAlign: 'center', 
    color: '#08D9D6'
  },
  modal: {
    backgroundColor: '#252A34',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingBottom: 250,
    flex: 1
  },
  header: {
    backgroundColor: '#252A34',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hideModal: {
    backgroundColor: '#252A34',
    color: '#08D9D6',
    fontSize: 20
  },
  submitButton: {
    width: 100,
    height: 40, 
    backgroundColor: '#08D9D6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    color: '#252A34',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newTask: {
    margin: 10, 
    fontSize: 24, 
    color: '#EAEAEA',
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    color: '#EAEAEA',
    margin: 20
  },
  input: {
    width: 500,
    height: 40,
    backgroundColor: '#EAEAEA'
  },
  recurrance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    height: 40
  }
  
});

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
      <View style={styles.footer}>
        <TouchableHighlight  onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text style={styles.showModal}>Show Modal</Text>
        </TouchableHighlight>
      
        <View>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={styles.header}>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text style={styles.hideModal}> Back</Text>
              </TouchableHighlight>
              <Text style={styles.newTask}>New Task</Text>
              <TouchableNativeFeedback onPress={this.onSubmit.bind(this)}>
                <View style={styles.submitButton}> 
                  <Text style={styles.submitText}>Submit</Text>
                </View>
              </TouchableNativeFeedback>

              </View>
            <View  style={styles.modal}>
              

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
