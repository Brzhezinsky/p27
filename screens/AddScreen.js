import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import { ButtonPlus, InputRow } from '../components/my-elements';

const db = SQLite.openDatabase('db.db');

export default class AddScreen extends React.Component {
  state = {
    items: null,
  };
  static navigationOptions = {
    title: 'Новая категория',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  };
  //this.props.navigation.goBack();
  render() {
    return (
      <View style={styles.container}>
        <InputRow onAddNew={text => {this.update}} />
      </View>
    );
  };

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
