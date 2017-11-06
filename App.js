import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Image, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Button as Button1} from 'react-native-elements';
import MyLocation from "./MyLocation"
import StackNav from "./StackNav"
import Header from "./Header"
import WinningNumbers from "./WinningNumbers"
import MyNumbers from "./MyNumbers"


 const MyApp = DrawerNavigator({
  MyLocation: {
    screen: MyLocation,
      headerMode: 'none'
  },
  WinningNumbers: {
    screen :WinningNumbers,
    },
  MyNumbers: {
    screen: MyNumbers,
  },
});

export default class App extends Component {

  render() {
    return <MyApp  />;
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
