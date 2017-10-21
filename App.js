import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Image, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Button as Button1} from 'react-native-elements';
import MyLocation from "./MyLocation"
import StackNav from "./StackNav"
import Header from "./Header"
import WinningNumbers from "./WinningNumbers"


 const MyApp = DrawerNavigator({
  MyLocation: {
    screen: MyLocation,
  },
  WinningNumbers: {
    screen :WinningNumbers,
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
