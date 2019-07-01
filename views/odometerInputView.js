import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import InputFiled from '../mycomponents/InputFiled'
import MyButton from '../mycomponents/myButton';
import MyLabel from '../mycomponents/MyLabel'
import {AsyncStorage} from 'react-native';

export default class OdometerInputView extends Component {
    state = {
        odometerState: '0'
    }
    onChangeText = (text)=>{
        this.setState({ odometerState: text });
    }

    unlockTrip = ()=>{
            AsyncStorage.setItem("onTrip",JSON.stringify({'bool':false,'whichCar':'none'})).catch((err)=>{
                console.log(err);
            })
    
    }

    onPress = ()=>{
        if(!isNaN(this.state.odometerState)){
            //here i will implement some input handling, for example i will upload data to the server or sore in local storage
            alert(this.state.odometerState);
            this.unlockTrip();
            this.props.navigation.navigate('CarSelectView');
        }else {
            alert("Please, provide a numeric input");
        }
    }

    render() {
        return (
            <View style = {styles.background}>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                    <MyLabel width={0.7*Dimensions.get('window').width} text = {this.props.navigation.state.params.carName}></MyLabel>
                    <InputFiled minWidth = {0.7*Dimensions.get('window').width} onChangeText={this.onChangeText} text="Odometer state..."></InputFiled>
                    <MyButton color="white" width = {0.7*Dimensions.get('window').width} onPress={this.onPress} text="ENTER"></MyButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#56CCF2',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20
  },
  background: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#56CCF2',
    padding: 15
  }
});