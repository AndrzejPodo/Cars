import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import InputFiled from '../mycomponents/InputFiled'
import MyButton from '../mycomponents/myButton';
import {AsyncStorage} from 'react-native';

const userId = 324; //userId will be fetched form database
const token="wdawe14wrqr34232321e2112eqwdq"; //token will be optained form authentication server


export default class LoginView extends Component{
    state = {
        login: "",
        password: ""
    }
    componentWillMount(){
        AsyncStorage.getItem('login').then((data)=>{
            if(JSON.parse(data).isLogged == true){
                this.props.navigation.navigate('CarSelectView', {'userId':userId});
            }
        })
    }
    getDate = ()=>{
        let date = new Date().getDate(); //Current Date
        let month = new Date().getMonth() + 1; //Current Month
        let year = new Date().getFullYear(); //Current Year
        let hours = new Date().getHours(); //Current Hours
        let min = new Date().getMinutes(); //Current Minutes
        let sec = new Date().getSeconds(); //Current Seconds
        return ({
            //Setting the value of the date time
            date:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
    }
    saveLoginData = async ()=>{
        try{
            await AsyncStorage.setItem('login',JSON.stringify({
                isLogged:true,
                userId: userId,
                userName: this.state.login,
                token: token,
                loginDate: this.getDate()
            }));
        }catch(err){
            console.log(err)
        }
    }
    loginOnPress = ()=>{
        alert("login: "+this.state.login + "\n" + "password: "+this.state.password);
        this.saveLoginData();
        this.props.navigation.navigate('CarSelectView');
    }
    registerOnPress = ()=>{
        this.props.navigation.navigate('RegisterView');
    }
    render() {
        return (
            <View style = {styles.background}>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                    <InputFiled minWidth = {0.7*Dimensions.get('window').width} onChangeText={(login)=>{this.setState({'login':login})}} text="Login"></InputFiled>
                    <InputFiled minWidth = {0.7*Dimensions.get('window').width} onChangeText={(password)=>{this.setState({'password': password})}} text="Password"></InputFiled>
                    <MyButton color="white" width = {0.7*Dimensions.get('window').width} onPress={this.loginOnPress} text="Login"></MyButton>
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