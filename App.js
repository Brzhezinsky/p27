import Expo, { SQLite } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator, } from 'react-navigation';

import Items from './components/Items';
import ButtonPlus from './components/my-elements';
import InputRow from './components/text-field';
import { HomeScreen, DetailsScreen, AddScreen } from './screens';

const db = SQLite.openDatabase('db.db');

const RootStack = StackNavigator({
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Add: {
      screen: AddScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#304ffe',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });


export default class App extends React.Component {
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text); ' +
        'create table if not exists subitems (id integer primary key not null, itemid int, done int, value text);'
      );
    });
  }
  render() {
    return <RootStack />;
  }
}
