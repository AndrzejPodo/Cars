import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import InputFiled from '../mycomponents/InputFiled'
import MyButton from '../mycomponents/myButton';
import MyLabel from '../mycomponents/MyLabel';
import {AsyncStorage} from 'react-native';

export default class TripStartView extends Component{
    state = {
        odometerState: 0
    }

    getOdometerState = ()=>{
        let o = 345637; //<<here i will fetch some data from asycstorage
        if(this.state.odometerState == 0){
            this.state.odometerState = o;
        }
        return o;
    }
    onChangeText = (text)=>{
        console.log(text)
        this.setState({ odometerState: parseInt(text) });
    }
    saveData = async (bool, car)=>{
        try{
            await AsyncStorage.setItem('onTrip', JSON.stringify({'bool':bool,'whichCar' : car}));
        }catch(error){
            console.log(error)
        }
    }
    onPress = ()=>{
        this.saveData(true, this.props.navigation.state.params.carName);
        this.props.navigation.navigate('OdometerInputView',{'carName':this.props.navigation.state.params.carName});
    }
    render(){
        return(
            <View style={styles.background}>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                    <MyLabel width={0.7*Dimensions.get('window').width} text = {this.props.navigation.state.params.carName}></MyLabel>
                    <InputFiled minWidth={0.7*Dimensions.get('window').width} text={this.getOdometerState()+""} onChangeText={this.onChangeText}></InputFiled>
                    <Text style={styles.text}>
                        Make sure that value above matches actual state of odometer!
                        If not, don't warry, just change state above, your manager will handle this inconsistency.                   
                    </Text>
                    <MyButton text="Start a trip!" color="white" width = {0.7*Dimensions.get('window').width} onPress={this.onPress}></MyButton>
                </View>
            </View>
        )
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
    },
    text:{
        color: 'red',
        fontSize: 10,
        margin: 20
    }
  });