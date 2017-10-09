import React, {Component} from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class Results extends Component {


    getDate() {
        console.log(this.props.game[0].date)
        let date = this.props.game[0].date.split("T")[0];
        let d = new Date(date);
        let day = d.getDay();
        let dayOfWeek = "";
        switch(day) {
            case 0:
                dayOfWeek = "Monday, ";
                break;
            case 1:
                dayOfWeek = "Tuesday, ";
                break;
            case 2:
                dayOfWeek = "Wednesday, ";
                break;
            case 3:
                dayOfWeek = "Thursday, ";
                break;
            case 4:
                dayOfWeek = "Friday, ";
                break;
            case 5:
                dayOfWeek = "Saturday, ";
                break;
            case 6:
                dayOfWeek = "Sunday, ";
                break;
             default:
                dayOfWeek = "";
                break;
        }
        return dayOfWeek + (d.getMonth() + 1) + "/" + (d.getDate() + 1) + "/" + d.getFullYear()
    }

    render() {
        return (
            <View>
                <Text style = {styles.myText}>{this.props.game[0].name}  {this.getDate()}</Text>
                <TouchableOpacity onPress={() => {Alert.alert("hey")}} style={{backgroundColor: 'pink'}}>
                        <View style ={{flexDirection:'row', flexWrap:'wrap'}}>
                    {this.props.game[0].winningNumbers.map((elem, index) =>
                        <Text style = {styles.circle}>{elem[0] === "0" && elem.length > 1 ? elem[1] : elem} </Text>
                    )}
                    {this.props.game[0].bonus.length != 0 ?
                    <Text style={ styles.bonusCircle}>
                        {this.props.game[0].bonus[0] === "0" && this.props.game[0].bonus.length > 1 ?
                         this.props.game[0].bonus[1] : this.props.game[0].bonus}
                                        </Text> : <Text/>}
                    </View>
                    <View style ={{flexDirection:'row', flexWrap:'wrap'}}>
                        <Text >{"\n"}</Text><Text style ={styles.extraStuff}>{this.props.game[0].extraText}</Text>
                        <Text style = {styles.extraStuff}>{this.props.game[0].extra[0] === "0" && this.props.game[0].extra.length > 1 ? this.props.game[0].extra[1] : this.props.game[0].extra }</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
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
       backgroundColor: 'lightgrey',
       paddingLeft: 5
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