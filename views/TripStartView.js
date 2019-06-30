import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import InputFiled from '../mycomponents/InputFiled'
import MyButton from '../mycomponents/myButton';

export default class TripStartView extends Component{
    state = {
        currentOdometerState: 345678
    }

    updateState = ()=>{
        let o = 345637; //<<here i will fetch some data from asycstorage
        this.setState({
                currentOdometerState: o.toString()
            }
        );
    }
    render(){
        return(
            <View style={styles.background}>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                    <InputFiled minWidth={0.7*Dimensions.get('window').width} text={this.state.currentOdometerState+""} ></InputFiled>
                    <Text style={styles.text}>
                        Make sure that value above matches actual state of odometer!
                        If not, don't warry, just change state above, your manager will handle this inconsistency.                   
                    </Text>
                    <MyButton text="Start a trip!" color="white" width = {0.7*Dimensions.get('window').width}></MyButton>
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