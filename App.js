import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Testing from "./Testing"
import Results from "./Results"

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hello'
  };
  render() {
  const {navigate} =this.props.navigation;

    return(
    <View>
    <Text>Hello, Navidation!</Text>
            <Button
              onPress={() => navigate('Chat')}
              title="Chat with Lucy"/>
                <Button
                            onPress={() => navigate('Test')}
                            title="Go to test"/>
            <Button
              onPress={() => navigate('RealTest')}
              title="Please Work"/>
    </View>
  )}
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',

  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}
class TestScreen extends React.Component {
  static navigationOptions = {
    title: 'test screen',

  };
  render() {
    return (
      <View>
        <Text>testing screen</Text>
      </View>
    );
  }
}
class RealTest extends React.Component {
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
        console.log(this.state.testData[0][0]);
     }
  static navigationOptions = {
    title: 'Real Test',

  };
  render() {
    return (
            <View style={{alignSelf: "stretch", marginTop: 30}}>
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




const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Test: {screen : TestScreen},
  RealTest: {screen: RealTest}
});

export default class App extends React.Component {

  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  }
});
