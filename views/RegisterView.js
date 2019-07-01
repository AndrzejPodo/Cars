import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import InputFiled from '../mycomponents/InputFiled'
import MyButton from '../mycomponents/myButton';

export default class RegisterView extends Component{
    state = {
        login: "",
        password: "",
        password2: ""
    }
    registerOnPress = ()=>{
        if(this.state.password === this.state.password2){
            alert("login: "+this.state.login + "\n" + "password: "+this.state.password);
        }else{
            alert("Passwords are diferent")
        }
    }
    render() {
        return (
            <View style = {styles.background}>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                    <InputFiled minWidth = {0.7*Dimensions.get('window').width} onChangeText={(login)=>{this.setState({'login':login})}} text="Login"></InputFiled>
                    <InputFiled minWidth = {0.7*Dimensions.get('window').width} onChangeText={(password)=>{this.setState({'password': password})}} text="Password"></InputFiled>
                    <InputFiled minWidth = {0.7*Dimensions.get('window').width} onChangeText={(password)=>{this.setState({'password2': password})}} text="Repeat password"></InputFiled>
                    <MyButton color="white" width = {0.7*Dimensions.get('window').width} onPress={this.registerOnPress} text="Register"></MyButton>
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