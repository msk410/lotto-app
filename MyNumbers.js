import { StackNavigator, DrawerNavigator } from 'react-navigation';
import React, {Component} from 'react';
import { Icon } from 'react-native-elements'
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView, StatusBar, AsyncStorage, Button, TextInput } from 'react-native';
import Header from "./Header"
import TempMyNums from "./TempMyNums"

const unsavedNums = {}
export default class WinningNumbers extends Component {
 static navigationOptions = {
    drawerLabel: 'My Saved Numbers',
    drawerIcon: () => (
    <Icon name='pound' type= "material-community"/> ),
  };
constructor(props) {
        super(props);
          this.state = {
            saveGameVisible: false,
            myNums: this.initState(),
          };
  }

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem('MyGame');
      if (value !== null){
        // We have data!!
        await this.setState({myNums: JSON.parse(value)})
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

   async initState() {
      try {
        const value = await AsyncStorage.getItem('MyGame');
        if (value !== null){
          // We have data!!
          await this.setState({myNums: JSON.parse(value)})
        }
      } catch (error) {
        // Error retrieving data
        console.log(error)
      }
    }

asdf(){
    this.setState({saveGameVisible:true})
    unsavedNums = []
}
onChange(value, index) {
    unsavedNums[index] = value;
}
async saveGame(gameName) {
    let tempGame = {};
    let tempNums = [];
    console.log(unsavedNums['num0'])
    if(unsavedNums["num0"]) tempNums.push(unsavedNums["num0"])
    if(unsavedNums["num1"]) tempNums.push(unsavedNums["num1"])
    if(unsavedNums["num2"]) tempNums.push(unsavedNums["num2"])
    if(unsavedNums["num3"]) tempNums.push(unsavedNums["num3"])
    if(unsavedNums["num4"]) tempNums.push(unsavedNums["num4"])
    if(tempNums.length > 0 || unsavedNums["bonusNum"]) {
        tempGame.gameName = gameName
        tempGame.nums = tempNums
        if(unsavedNums["bonusNum"]) tempGame.bonusNum = unsavedNums["bonusNum"]
    }
    let myGame;
    try {
        myGame = await AsyncStorage.getItem('MyGame');
        if(await myGame) {
        if(tempGame.gameName) {
            let myGameList = JSON.parse(myGame);
            myGameList.push(tempGame);
            AsyncStorage.setItem('MyGame', JSON.stringify(myGameList));
            await this.setState({myNums: myGameList})
            }
        } else {
        if(tempGame.gameName) {
            let myGameList = [tempGame];
            AsyncStorage.setItem('MyGame', JSON.stringify(myGameList))
            await this.setState({myNums: myGameList})
            }
        }
    } catch(error) {
        console.log(error)
    }
    unsavedNums = []
    this.setState({saveGameVisible: false})

}
clearGame() {
 AsyncStorage.removeItem('MyGame')
 unsavedNums = []
 }

 deleteGame(index) {
    let currentSavedGames = this.state.myNums;
    if(index > -1) {
        currentSavedGames.splice(index,1);
    }
    this.setState({myNums:currentSavedGames})
     AsyncStorage.setItem('MyGame', JSON.stringify(currentSavedGames));
 }

 async showGames() {
 try {
   console.log(await AsyncStorage.getItem('MyGame'))

 }catch(error){
 console.log("cannot show")}
 }
  render() {
      return (
      <View>
                  <Header title = "My Saved Numbers" openDrawer = {() => this.props.navigation.navigate('DrawerOpen')} />

                  <StatusBar hidden={true} />
                    <Button
                      onPress={() => this.asdf()}
                      title="Add Megamillions Game"
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
                    />
                    {this.state.saveGameVisible && <View  style = {{alignItems: 'center', justifyContent:'center', borderWidth: 0.5,  borderColor: '#000000' }}>
                                                                   <Text style = {styles.myText}>game name</Text>

                                                                           <View style ={{alignItems: 'center', justifyContent:'center', flexDirection:'row', flexWrap:'wrap'}}>
                                                                           <TextInput
                                                                                   style={styles.circle}
                                                                                   onChangeText={(text) => this.onChange(text, "num0")}
                                                                                   maxLength = {2}
                                                                                   keyboardType = {'numeric'}
                                                                                   underlineColorAndroid = {'transparent'}
                                                                                 />
                                                                           <TextInput
                                                                                   style={styles.circle}
                                                                                   onChangeText={(text) => this.onChange(text, "num1")}
                                                                                   maxLength = {2}
                                                                                   keyboardType = {'numeric'}
                                                                                   underlineColorAndroid = {'transparent'}
                                                                                 />
                                                                           <TextInput
                                                                                   style={styles.circle}
                                                                                   onChangeText={(text) => this.onChange(text, "num2")}
                                                                                   maxLength = {2}
                                                                                   keyboardType = {'numeric'}
                                                                                   underlineColorAndroid = {'transparent'}
                                                                                 />
                                                                           <TextInput
                                                                                   style={styles.circle}
                                                                                   onChangeText={(text) => this.onChange(text, "num3")}
                                                                                   maxLength = {2}
                                                                                   keyboardType = {'numeric'}
                                                                                   underlineColorAndroid = {'transparent'}
                                                                                 />

                                                                           <TextInput
                                                                                   style={styles.circle}
                                                                                   onChangeText={(text) => this.onChange(text, "num4")}
                                                                                   maxLength = {2}
                                                                                   keyboardType = {'numeric'}
                                                                                   underlineColorAndroid = {'transparent'}
                                                                                 />
                                                                           <TextInput
                                                                                   style={styles.bonusCircle}
                                                                                   onChangeText={(text) => this.onChange(text, "bonusNum")}
                                                                                   maxLength = {2}
                                                                                   keyboardType = {'numeric'}
                                                                                   underlineColorAndroid = {'transparent'}
                                                                                 />


                                                                           <Button
                                                                             onPress={() => this.saveGame("Mega Millions")}
                                                                             title="Save Game"
                                                                             color="#841584"
                                                                             accessibilityLabel="Learn more about this purple button"
                                                                           />
                                                                       </View>
                                                                       </View>}
                                                                       <ScrollView>
                    {this.state.myNums.length > 0 &&
                    this.state.myNums.map((elem, index) =>
                     <View key = {index} style = {{alignItems: 'center', justifyContent:'center', borderWidth: 0.5,  borderColor: '#000000' }}>
                                    <Text style = {styles.myText}>{this.state.myNums[0].gameName}</Text>
                                 <View style ={{alignItems: 'center', justifyContent:'center', flexDirection:'row', flexWrap:'wrap'}}>
                                {elem.nums && elem.nums.map((num, index2) =>
                                    <Text key = {index2} style = {styles.circle}>{num[0] === "0" && num.length > 1 ? num[1] : num} </Text>
                                )}

                                {elem.bonusNum &&
                                 <Text style={ styles.bonusCircle}>{(elem.bonusNum[0] === "0" &&elem.bonusNum.length > 1) ?
                                                         elem.bonusNum[1] : elem.bonusNum}</Text>}

                                </View>
                                <Button
                                     onPress={() => this.deleteGame(index)}
                                     title="Delete"
                                     color="#841584"
                                     accessibilityLabel="Learn more about this purple button"
                                   />
                                </View>)




                    }
                    </ScrollView>
                    <Button
                          onPress={() => this.clearGame()}
                          title="Clear Games"
                          color="#841584"
                          accessibilityLabel="Learn more about this purple button"
                        />
                    <Button
                        onPress={() => this.showGames()}
                        title="show Games"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                      />
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  myText: {
    fontSize: 18,
  },
  circle: {
       fontSize: 25,
       textAlign: 'center',
       textAlignVertical: 'center',
       height: 45,
       width: 45,
       borderRadius: 30 ,
       backgroundColor: 'white',
       paddingLeft: 5,
       borderWidth: 0.5,
       borderColor: '#000000',
     },
       bonusCircle: {
            fontSize: 25,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: 45,
            width: 45,
            borderRadius: 30 ,
            backgroundColor: 'red',
          },
          extraStuff: {
                      fontSize: 25
                    }
});