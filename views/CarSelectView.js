import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView} from 'react-native';
import MyLabel from '../mycomponents/MyLabel';
import CarSelectionButton from '../mycomponents/CarSelectionButton'
import {AsyncStorage} from 'react-native';

export default class CarSelectView extends Component{
    componentWillMount(){
        AsyncStorage.getItem('onTrip').then((data)=>{
            console.log(JSON.parse(data).bool)
            if(JSON.parse(data).bool == true){
                console.log("halo");
                this.props.navigation.navigate('OdometerInputView', {'carName':JSON.parse(data).whichCar});
            }
        })
    }
    //this onPress handler will navigate to apropriate screen cennected to the choosen car
    onPress = (object)=>{
        alert(object.carName);
        this.props.navigation.navigate('TripStartView',{'carName':object.carName});
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