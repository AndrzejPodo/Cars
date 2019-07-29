import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
//MyButton is generic class that facilitate creating custom buttons with stylign that matches my application
export default class MyButton extends Component{
    render(){
        return(
            <View width={this.props.width}>
                <TouchableOpacity  onPress={this.props.onPress} style={buttonStyle(this.props.color)}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

buttonStyle = (color)=>{
    return({
        display: 'flex',
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 15,
        marginTop:20
    })
}

styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'black'
    },
});