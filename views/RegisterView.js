import React, {Component} from 'react';
import {Dimensions, StyleSheet, View,Text} from 'react-native';
import InputFiled from '../mycomponents/InputFiled'
import MyButton from '../mycomponents/myButton';
import SwitchToggle from 'react-native-switch-toggle';
import Config from '../network.config'

export default class RegisterView extends Component{
    state = {
        login: "",
        email: "",
        password: "",
        password2: "",
        userSwitch: false,
        adminSwitch: false
    }
    registerOnPress = ()=>{
        if(this.state.password != this.state.password2){
            alert("Passwords are diferent")
        }else if(this.state.userSwitch == false && this.state.adminSwitch == false){
            alert("Choose at least one role")
        }else{
           this.createUser().then((res)=>alert(res)).then(this.props.navigation.navigate('LoginView'))
        }
    }

    createUser = async () => {
        roles = new Array();
        if(this.state.userSwitch) roles.push({role: "USER"})
        if(this.state.adminSwitch) roles.push({role: "ADMIN"})

        return fetch(Config.SERVER_URL+'/user/register', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.login,
                    password: this.state.password,
                    email: this.state.email,
                    roles: roles
                })
            }).then((res)=> {return res.text()}).then((resText)=>{return (resText)}).catch((err)=>alert(err))
        
    }

    render() {
        return (
            <View style = {styles.background}>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                    <InputFiled autoCapitalize="none" autoCompleteType = "username" minWidth = {0.7*Dimensions.get('window').width} onChangeText={(login)=>{this.setState({'login':login})}} text="Login"></InputFiled>
                    <InputFiled autoCapitalize="none" autoCompleteType = "email" minWidth = {0.7*Dimensions.get('window').width} onChangeText={(email)=>{this.setState({'email':email})}} text="Email"></InputFiled>
                    <InputFiled autoCapitalize="none" autoCompleteType = "off" secureTextEntry={true} minWidth = {0.7*Dimensions.get('window').width} onChangeText={(password)=>{this.setState({'password': password})}} text="Password"></InputFiled>
                    <InputFiled autoCapitalize="none" autoCompleteType = "off" secureTextEntry={true} minWidth = {0.7*Dimensions.get('window').width} onChangeText={(password)=>{this.setState({'password2': password})}} text="Repeat password"></InputFiled>
                    <MyButton color="white" width = {0.7*Dimensions.get('window').width} onPress={this.registerOnPress} text="Register"></MyButton>
                    <View width = {0.7*Dimensions.get('window').width} style={styles.switchContainer}>    
                        <Text style={{fontSize: 20}}>User Account</Text>
                        <SwitchToggle
                            switchOn={this.state.userSwitch}
                            onPress={this.onUserSwitch}
                        />
                    </View>
                    <View width = {0.7*Dimensions.get('window').width} style={styles.switchContainer}>
                        <Text style={{fontSize: 20}}>Admin Account</Text>    
                        <SwitchToggle
                            switchOn={this.state.adminSwitch}
                            onPress={this.onAdminSwitch}
                        />
                    </View>
                </View>
            </View>
        );
    }

    onUserSwitch = ()=>{
        this.setState({'userSwitch':!this.state.userSwitch})
    }
    onAdminSwitch = ()=>{
        this.setState({'adminSwitch':!this.state.adminSwitch})
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
    switchContainer:{
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 10,
    }
  });