import React, { Component } from 'react';
import { TouchableHighlight, View, StatusBar, Text } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Header extends Component {
 static navigationOptions = {
      drawerLabel: 'My Location',
      drawerIcon: () => (
        <Icon
            name='map-marker'
            type = "material-community"/>
         ),
   };
  render() {
    return (
        <View  style = {{height: 50, backgroundColor: "#428bca", flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row',}}>
        <TouchableHighlight>
            <Icon style = {{paddingLeft:5}} name='menu' type = "material-community" size = {35} />

            <Text style = {{color: "white", fontSize: 25, textAlign: 'center', }}>     Select Your State</Text>
            </TouchableHighlight>
        </View>
    )
}
}