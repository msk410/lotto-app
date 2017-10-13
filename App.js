import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Image, AsyncStorage, Alert } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Testing from "./Testing"
import Results from "./Results"
import { Button as Button1, Header} from 'react-native-elements';
import { Icon } from 'react-native-elements'
import MyLocation from "./MyLocation"
//import StackNav from "./StackNav"


const stackNav = StackNavigator({
    Main: {
        screen: MyLocation,
        navigationOptions:({navigation}) => ({
            title: "Main",
            headerLeft:(
                <Icon
                onPress = {() => Alert.alert("hey")}
                          name='pencil'
                          type = "material-community"/>),
            headerStyle: { paddingRight: 10, paddingLeft: 10 }
        })
    },


})




class TestScreen extends Component {
 static navigationOptions = {
    drawerLabel: 'Test Screen afsdfas',
  };
constructor(props) {
        super(props);
          this.state = {
            testData: []
          };
  }
     async componentWillMount() {
     console.log("hey2")
        let a = new Testing();
        let b = await a.blah();
        this.setState({
            testData: b
        })
     }
  static navigationOptions = {
    title: 'Real Test my man',

  };
  render() {
    return (
            <View style={{alignSelf: "stretch", marginTop: 30}}>
            <StatusBar hidden={true} />
            <Text>Hey</Text>
<ScrollView>
        {this.state.testData.map((elem,index) =>
            <Results game = {elem}></Results>
        )}

</ScrollView>

            </View>
    );
  }
}


 const MyApp = DrawerNavigator({
  StackNav: {
    screen : stackNav,
  },
    Test: {
      screen :TestScreen,
      },

});

export default class App extends Component {

  render() {
    return <MyApp />;
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
