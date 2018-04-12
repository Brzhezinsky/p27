import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import { ButtonPlus, InputRow, Items } from '../components/my-elements';

const db = SQLite.openDatabase('db.db');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Каталог',
      headerRight: (
        <View>
        <Button
          onPress={() => navigation.navigate('Add')}
          title="  +  "
        />
        <Button
          onPress={() => this.update}
          title=" upd "
        />
        </View>
      ),
    }
  };

  state = {
    items: null,
    selectedItem: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.tablefield}>
            <Items
              done={false}
              ref={todo => (this.todo = todo)}
              onPressItem={id => this.makeDone(id)}
            />
            <Items
              done={true}
              ref={done => (this.done = done)}
              onPressItem={
                (id, value) => this.props.navigation.navigate(
                    'Details', {
                    itemId: id,
                    itemName: value,
                  }
                )
              }
            />
          </View>
        </ScrollView>
        <ButtonPlus
        onPress={() => this.props.navigation.navigate('Add')}/>
      </View>
    );
  }

  makeDone = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
      },
      null,
      this.update
    );
  };

  makeDelete = (id) => {
    db.transaction(
        tx => {
          tx.executeSql(`delete from items where id = ?;`, [id]);
        },
        null,
        this.update
    )
  };

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
  tablefield: {
    flex: 1,
    backgroundColor: 'gray',
  }
});
