import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import InputFiled from '../mycomponents/InputFiled'
import MyButton from '../mycomponents/myButton';
import {AsyncStorage} from 'react-native';
import Config from '../network.config'


const userId = 324; //userId will be fetched form database
// const token="wdawe14wrqr34232321e2112eqwdq"; //token will be optained form authentication server


export default class LoginView extends Component{
    state = {
        email: "",
        password: "",
        token:"1321431525452"
    }
    componentWillMount(){
        AsyncStorage.getItem('login').then((data)=>{
            if(JSON.parse(data).isLogged == true){
                if(JSON.parse(data).role == "USER")
                    this.props.navigation.navigate('CarSelectView', {'userId':userId});
                else if (JSON.parse(data).role == "ADMIN"){
                    this.props.navigation.navigate('GroupManagementView', {'userId':userId});
                }
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
    saveLoginData = async (role)=>{
        try{
            await AsyncStorage.setItem('login',JSON.stringify({
                isLogged:true,
                role: role,
                userId: userId,
                userName: this.state.login,
                token: this.state.token,
                loginDate: this.getDate()
            }));
        }catch(err){
            console.log(err)
        }
    }


    loginOnPress = ()=>{
        //TODO: send request for authenticaiton
        return fetch(Config.SERVER_URL+'/user/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: this.state.password,
                email: this.state.email,
            })
        }).then((res)=>{
            if(res.status == 401){
                throw new Error("Authentication failed! \n" + "email: "+this.state.email + "\npassword: "+this.state.password)
            }else{
               return res.json();
            }
        }).then((resJson)=>{
            this.saveLoginData(resJson.token,"USER");
            this.props.navigation.navigate('CarSelectView');
        }).catch(err=>alert(err.toString()));
        alert("login: "+this.state.login + "\n" + "password: "+this.state.password);
        token= "dkwjabdkabwduab;odiba;oidibwa;oib"
        this.saveLoginData(token, "USER");
        this.props.navigation.navigate('CarSelectView');
    }


    loginAsAdminOnPress = () => {
        //TODO: send request for authentication
        alert("login: "+this.state.login + "\n" + "password: "+this.state.password);
        token= "dkwjabdkabwduab;odiba;oidibwa;oib"
        this.saveLoginData(token, "ADMIN");
        this.props.navigation.navigate('GroupManagementView');
    }
    registerOnPress = ()=>{
        this.props.navigation.navigate('RegisterView');
    }
    render() {
        return (
            <View style = {styles.background}>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                    <InputFiled autoCapitalize="none" autoCompleteType = "email" minWidth = {0.7*Dimensions.get('window').width} onChangeText={(email)=>{this.setState({'email':email})}} text="Email"></InputFiled>
                    <InputFiled autoCapitalize="none" autoCompleteType = "off" secureTextEntry={true} minWidth = {0.7*Dimensions.get('window').width} onChangeText={(password)=>{this.setState({'password': password})}} text="Password"></InputFiled>
                    <MyButton color="white" width = {0.7*Dimensions.get('window').width} onPress={this.loginOnPress} text="Login"></MyButton>
                    <MyButton color="white" width = {0.7*Dimensions.get('window').width} onPress={this.loginAsAdminOnPress} text="Login As Admin"></MyButton>
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