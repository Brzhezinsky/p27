import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class BtnPlus extends React.Component {

    render() {
      return (
        <TouchableOpacity
          style={styles.plusbutton}>
          <Text style={styles.plustext}>+</Text>
        </TouchableOpacity>
      );
    }

}

const styles = StyleSheet.create({
  plusbutton: {
    backgroundColor: '#304ffe',
    width: 56,
    height: 56,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  plustext: {
    paddingLeft: 20,
    paddingTop: 6,
    fontSize: 30,
    color: "#FFFFFF",
  }
});
