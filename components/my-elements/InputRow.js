
import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const db = SQLite.openDatabase('db.db');

export default class InputRow extends React.Component {
  state = {
    items: null,
  };

    render() {
      return (
        <View style={styles.inputrow}>
          <TextInput
            style={styles.textinput}
            placeholder="что записать?"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={() => {
              this.add(this.state.text);
              this.setState({ text: null });
            }}
          />
        </View>
      );
    }
    add(text) {
      db.transaction(
        tx => {
          tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
          tx.executeSql('select * from items', [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null,
        this.props.onAddNew(text)
      );
    };
}

const styles = StyleSheet.create({
  inputrow: {
    flexDirection: 'row',
  },
  textinput: {
    flex: 1,
    padding: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },

});
