import React, { Component } from 'react';
import { AppRegistry, Text, View, FlatList, StyleSheet, TouchableOpacity , Alert, ScrollView} from 'react-native';
import NyLotto from "./NyLotto";
import Results from "./Results";
import Testing from "./Testing";
import Game from "./Game";


export default class LotsOfGreetings extends Component {
constructor(props) {
        super(props);
          this.state = {
            testData: []
          };
  }
     async componentWillMount() {
    let a = new Testing();
        let b = await a.blah();
        this.setState({
            testData: b
        })
     }

  render() {
    return (
      <View style={{alignSelf: "stretch", marginTop: 30}}>
      <ScrollView>
        {this.state.testData.map((elem,index) =>
            <Results game = {elem}></Results>
        )}

</ScrollView>

      </View>
    );
  }
}const styles = StyleSheet.create({
   container: {
    flex: 1,
    paddingTop: 22
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
     backgroundColor: 'pink',
     marginTop: 10
   },
 })