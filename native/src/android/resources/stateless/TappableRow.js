import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

export default class TappableRow extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="#D0D0D0"
        onPress={this.props.onPress}>
        <Text>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    )
  }
}
