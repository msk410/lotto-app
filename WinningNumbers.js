import { StackNavigator, DrawerNavigator } from 'react-navigation';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Image, AsyncStorage, Animated, Easing} from 'react-native';
import Results from "./Results"
import Testing from "./Testing"
import Header from "./Header"
import TexasScraper from "./TexasScraper"
import { Icon } from 'react-native-elements'


export default class WinningNumbers extends Component {
 static navigationOptions = {
    drawerLabel: 'Winning Numbers',
    drawerIcon: () => (
    <Icon name='dollar' type = "font-awesome"/> ),
  };
constructor(props) {
        super(props);
          this.state = {
            testData: [],
            wtf : ""
          };
  }
     async componentWillMount() {
      try {
       const value = await AsyncStorage.getItem('@MyLocation:key');
        if (value !== null){
        // We have data!!
            if(value === "TX") {
                let texasData = new TexasScraper();
                let data = await texasData.getAllData();
                this.setState({testData: data})
                } else if(value === "NY") {
                    let a = new Testing();
                    let b = await a.blah();

                    this.setState({
                                testData: b
                            })
                     }
              }
            } catch (error) {
              // Error retrieving data
              console.log("error 1")
            }


//
//        let a = new Testing();
//        let b = await a.blah();
//        this.setState({
//            testData: b
//        })
     }




  render() {
    return (
            <View style={{alignSelf: "stretch", flex: 1, backgroundColor: "#f9f9f9"}}>
            <Header title = "Winning Numbers" openDrawer = {() => this.props.navigation.navigate('DrawerOpen')} />
            <StatusBar hidden={true} />

            {this.state.testData.length === 0 ? <View style = {{ marginTop: 200, alignItems: 'center', justifyContent:'center'}}><Image source={require('./images/loading.gif')} /></View> : <ScrollView>
                {this.state.testData.map((elem,index) =>
                    <Results key = {index} game = {elem}></Results>
                )}

            </ScrollView>
            }
            </View>
    );
  }
}



