import React, { Component } from 'react';
import { View, Button, StatusBar, AsyncStorage, Text, Modal, TouchableHighlight, ScrollView, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements'
import Header from "./Header"
import { StackNavigator, } from 'react-navigation';


export default class MyLocation extends Component {
constructor(props) {
        super(props);
          this.state = {
            myLocation: '',
          };
  }

  static navigationOptions = {
      drawerLabel: 'My Location',
      drawerIcon: () => (
        <Icon
            name='map-marker'
            type = "material-community"/>
         ),
   };
  componentWillMount() {
       this.getLocation().then((data) => {
       this.setState({
                  myLocation: data
                })
      }).catch((err) => console.log(err))
    }

   saveLocation(loc) {
    try {
       AsyncStorage.setItem('@MyLocation:key', loc);
      this.setState({
        myLocation: loc
      })

    } catch (error) {
      // Error saving data
      console.log("save error")
    }
    this.props.navigation.navigate("WinningNumbers")
  }

   async getLocation() {
      try {
        const value = await AsyncStorage.getItem('@MyLocation:key');

        if (value !== null){
          // We have data!!
          return value
        }
      } catch (error) {
        // Error retrieving data
        console.log("error")
        return "CA";
      }
  }
  render() {
    return (

        <View style = {{flex: 1,  backgroundColor: "#f9f9f9"}}>
                <StatusBar hidden = {true}/>
                <Header openDrawer = {() => this.props.navigation.navigate('DrawerOpen')} title = {"Select Your State"}/>
                <FlatList
                  data={[
                    {key: 'California',
                     ab: "CA"
                    },
                    {key: 'New York',
                     ab: "NY"
                    },
                    {key: 'Texas',
                     ab: "TX"
                    },
                  ]}
                  renderItem={({item}) => <TouchableOpacity style ={{  backgroundColor: "#ffffff", justifyContent: 'space-between', flexDirection:'row', flexWrap:'wrap',  borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth}} onPress={() => this.saveLocation(item.ab)}>
                    <Text style = {{ paddingTop: 5, paddingBottom : 5, paddingLeft: 10, fontSize : 30, marginTop : 5,}}>{item.key}
                    </Text>
                    {this.state.myLocation === item.ab && <Icon  name='check' type = "material-community" color = "#428bca"/> }
                  </TouchableOpacity>}
                />
              </View>

    );
  }
}