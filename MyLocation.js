import React, { Component } from 'react';
import { View, Button, StatusBar, AsyncStorage, Text, Modal, TouchableHighlight, ScrollView, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements'
import Header from "./Header"
import { StackNavigator, } from 'react-navigation';


export default class MyLocation extends Component {
constructor(props) {
        super(props);
          this.state = {
            myLocation: 'NY',
            modalVisible: false,
          };
  }

  static navigationOptions = {
  title: "hey",
      drawerLabel: 'My Location',
      drawerIcon: () => (
        <Icon
            name='map-marker'
            type = "material-community"/>
         ),
   };
  componentWillMount() {
       this.getLocation().then((data) => {
       console.log("setting location to " + data)
       this.setState({
                  myLocation: data
                })
      }).catch((err) => console.log(err))
      console.log(this.state.myLocation + " wtf")
    }

  async saveLocation() {
    try {
      await AsyncStorage.setItem('@MyLocation:key', 'NY');
    } catch (error) {
      // Error saving data
      console.log("save error")
    }
  }

   async getLocation() {
      try {
        const value = await AsyncStorage.getItem('@MyLocation:key');

        if (value !== null){
          // We have data!!
          console.log("in get location" + value)
          return value
        }
      } catch (error) {
        // Error retrieving data
        console.log("error")
        return "CA";
      }
  }
 setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (

        <View style = {{flex: 1}}>
                <StatusBar hidden = {true}/>
                <FlatList
                  data={[
                    {key: 'New York',
                     ab: "NY"
                    },
                    {key: 'California',
                     ab: "CA"
                    },
                  ]}
                  renderItem={({item}) => <TouchableOpacity onPress={() => {Alert.alert(item.ab)}}>
                    <Text style = {{paddingTop: 5, paddingBottom : 5, paddingLeft: 10, fontSize : 30, marginTop : 5, borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth}}>{item.key}
                    </Text>
                  </TouchableOpacity>}
                />
              </View>

    );
  }
}