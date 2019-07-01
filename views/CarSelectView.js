import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView} from 'react-native';
import MyLabel from '../mycomponents/MyLabel';
import MyButton from '../mycomponents/myButton';
import CarSelectionButton from '../mycomponents/CarSelectionButton'
import {AsyncStorage} from 'react-native';

export default class CarSelectView extends Component{
    componentWillMount(){
        AsyncStorage.getItem(this.props.navigation.state.userId+'').then((data)=>{
            if(JSON.parse(data).bool == true){
                this.props.navigation.navigate('OdometerInputView', {'userId':this.props.navigation.state.userId,'carName':JSON.parse(data).whichCar});
            }
        })
    }
    //this onPress handler will navigate to apropriate screen cennected to the choosen car
    onPress = (object)=>{
        this.props.navigation.navigate('TripStartView',{'userId':this.props.navigation.state.userId,'carName':object.carName});
    }
    deleteLoginData = async()=>{
        try{
            await AsyncStorage.setItem('login',JSON.stringify({
                isLogged:false,
                userId: null,
                userName: null,
                token: null,
                loginDate: null
            }));
        }catch(err){
            console.log(err)
        }
    }
    onLogoutPress = ()=>{
        this.deleteLoginData();
        this.props.navigation.navigate('LoginView');
    }
    state = {
        //this table will be some list of objects downloaded from serwer or from local storage
        names: [
           {'name': 'VW Bora', 'id': 1},
           {'name': 'Volvo V50', 'id': 2},
           {'name': 'Toyota Avensis', 'id':3},
           {'name': 'Fiat Puntu', 'id': 4},
        ]
    }
    render(){
        return(
            <View style={styles.background}>
                <View width={Dimensions.get('window').width - 30} style = {styles.container}>
                    <MyLabel width={0.7*Dimensions.get('window').width} text="Select a car"/>
                    <View width={0.7*Dimensions.get('window').width} style={styles.scrollVeiw}>
                        <ScrollView>
                            {
                                this.state.names.map((item)=>{
                                    return(<CarSelectionButton
                                        id={item.id}
                                        carName={item.name}
                                        key={item.id} 
                                        text={item.name} 
                                        color="#C4C4C4" 
                                        width = {0.6*Dimensions.get('window').width}
                                        onPress={this.onPress}
                                    />)
                                })
                            }
                        </ScrollView>
                    </View>
                    <MyButton color="white" width = {0.7*Dimensions.get('window').width} onPress={this.onLogoutPress} text="Logout"></MyButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollVeiw :{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius: 20
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56CCF2',
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20,
        paddingTop:20,
        paddingBottom:20
    },
    background: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56CCF2',
        padding: 15
      }
});