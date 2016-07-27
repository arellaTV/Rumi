import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  TouchableNativeFeedback,
  Image
} from 'react-native';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      details: '',
      interval: '0',
      recurrance: 'hours'
    }
  }

  onSubmit() {
    console.log('submitted!');
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
            onChangeText={(num) => this.setState({number: num})}
            value={this.state.interval}/>
          <Picker
            style={{width: 100}}
            selectedValue={this.state.recurrance}
            onValueChange={(recurrance) => this.setState({recurrance: recurrance})}>
            <Picker.Item label='hour(s)' value='hours' />
            <Picker.Item label='day(s)' value='days' />
          </Picker>
        </View>
        <Text>Details:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({details: text})}
          multiline={true}/>
        <TouchableNativeFeedback onPress={this.onSubmit}>
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
