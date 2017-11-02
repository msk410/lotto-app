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
            modalVisible: false,
            modalMessage: [],
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


        const rawSavedNums = await AsyncStorage.getItem('MyGame');
        savedNums = JSON.parse(rawSavedNums);
        if(savedNums !== null) {
            if(savedNums.length > 0) {
            let messageList = [];
                for(let i = 0; i < savedNums.length; i++) {
                    let isBonusMatch = false;
                    let numMatches = 0;
                    let matchingNumsObject = {}
                    if(savedNums[i].gameName === this.state.testData[0][0].name) {
                        if(savedNums[i].bonusNum === this.state.testData[0][0].bonus) {
                        isBonusMatch = true;
                        }
                        for(let j = 0; j < savedNums[i].nums.length; j++) {
                            if(this.state.testData[0][0].winningNumbers.includes(savedNums[i].nums[j])) {
                                matchingNumsObject[savedNums[i].nums[j]] = true;
                            }
                        }
                        numMatches = Object.keys(matchingNumsObject).length;
                        let winningMessage = "";
                        if(isBonusMatch && numMatches === 0) {
                            winningMessage = "Your bonus number " + savedNums[i].bonusNum + " matched 0 + 1. Prize: $2"
                        } else if(isBonusMatch && numMatches === 1) {
                            winningMessage = "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 1 + 1. Prize: $4"
                        } else if(isBonusMatch && numMatches === 2) {
                            winningMessage = "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 2 + 1. Prize: $10"
                        } else if(!isBonusMatch && numMatches === 3) {
                            winningMessage = "Your numbers " + savedNums[i].nums + " matched 3 + 0. Prize: $10"
                        } else if(isBonusMatch && numMatches === 3) {
                             winningMessage = "Your numbers " + savedNums[i].nums + " " + savedNums[i].bonusNum + " matched 3 + 1. Prize: $200"
                        } else if(!isBonusMatch && numMatches === 4) {
                           winningMessage = "Your numbers " + savedNums[i].nums + " matched 4 + 0. Prize: $500"
                        } else if(isBonusMatch && numMatches === 4) {
                           winningMessage = "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 4 + 1. Prize: $10000"
                        } else if(!isBonusMatch && numMatches === 5) {
                          winningMessage = "Your numbers " + savedNums[i].nums + " matched 5 + 0. Prize: $1000000"
                        } else if(isBonusMatch && numMatches === 5) {
                             winningMessage = "Your numbers " + savedNums[i].nums + " / " + savedNums[i].bonusNum + " matched 5 + 1. Prize: JACKPOT!"
                         }

                         messageList.push(winningMessage);

                    }
                }
                this.setState({modalVisible:true, modalMessage: messageList})
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
                               <ScrollView>
                                <View style = {{borderBottomColor: '#bbb', borderBottomWidth: 4,}}>
               <Text>You may have won on {this.state.testData.length > 0 && this.state.testData[0][0].date.split("T")[0]}! Check your numbers.</Text>
               </View>
               {this.state.modalMessage.map((elem,index) =>
               <View style = {{borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth}}>
                <Text>{elem}</Text>
                </View>
                )}

               </ScrollView>
<Button title = "Ok" onPress={() => {this.setState({modalVisible:false})}} />
             </View>

            </View>

           </Modal>

            </View>
    );
  }
}



