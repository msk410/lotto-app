import { StackNavigator, DrawerNavigator } from 'react-navigation';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, StatusBar, Image, AsyncStorage, Animated, Easing, Modal, TouchableHighlight} from 'react-native';
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
            modalVisible: false
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


        const savedNums = await AsyncStorage.getItem('MyGame');
        if(savedNums !== null) {
            if(savedNums.length > 0) {
                console.log(this.state.testData[0][0])
                this.setState({modalVisible:true})
            }
        }

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

            <Modal
             animationType="fade"
             transparent={true}
             visible={this.state.modalVisible}
             onRequestClose={() => {alert("Modal has been closed.")}}
             >
            <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000080'
                            }}>
             <View style={{ backgroundColor: '#fff', padding: 20,
                               width: 300,
                               height: 300}}>
               <Text>Hello World!</Text>

               <TouchableHighlight onPress={() => {this.setState({modalVisible:false})
               }}>
                 <Text>Hide Modal</Text>
               </TouchableHighlight>

             </View>
            </View>
           </Modal>

            </View>
    );
  }
}



