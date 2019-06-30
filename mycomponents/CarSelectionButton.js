import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import MyButton from './myButton'

//this component utilises MyButton, and costumizes it for CarSelectView purpose
export default class CarSelectionButton extends Component{
    onPress = () =>{
        this.props.onPress({
            'id':this.props.id,
            'carName':this.props.carName
        });
    }
    render(){
        return(
            <MyButton width={this.props.width} color={this.props.color} onPress={this.onPress} text = {this.props.text}/>
        );
    }
}