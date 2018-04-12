import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

const db = SQLite.openDatabase('db.db');

export default class DetailsScreen extends React.Component {
  state = {
    items: null,
    selectedItem: {
      value: "",
    },
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? ('Категория ' + params.itemName) : 'Категория',
    }
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    this.selects(itemId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemInfo}>
          <Text>{this.state.selectedItem.value}</Text>
        </View>
      </View>
    );
  }

  selects(itemId) {
    const sql = 'select * from items where id = ' + itemId + ';';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (_, { rows: { _array } }) => {
          this.setState({ selectedItem: _array[0] });
        }
      );
    });
  }

}

const styles = StyleSheet.create({
  itemInfo: {
    backgroundColor: `#eef`
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
