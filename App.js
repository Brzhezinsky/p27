import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Items from './components/Items';
import BtnPlus from './components/BtnPlus';

const db = SQLite.openDatabase('db.db');

export default class App extends React.Component {
  state = {
    text: null,
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text);'
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Заметки</Text>
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
      <View style={styles.tablefield}>
        <Items
          done={false}
          ref={todo => (this.todo = todo)}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
              },
              null,
              this.update
            )}
        />
        <Items
          done={true}
          ref={done => (this.done = done)}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`delete from items where id = ?;`, [id]);
              },
              null,
              this.update
            )}
        />
        <BtnPlus />
      </View>
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
      this.update
    );
  }

  update = () => {
    this.todo && this.todo.update();
    this.done && this.done.update();
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    backgroundColor: '#304ffe',
    paddingTop: Expo.Constants.statusBarHeight + 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
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
  tablefield: {
    flex: 1,
    backgroundColor: 'gray',
  }
});
