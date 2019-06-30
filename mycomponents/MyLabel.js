import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default class MyLabel extends Component{
    render(){
        return(
            <View width={this.props.width} style={styles.label}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    label:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 15,
        backgroundColor: "white",
        marginBottom: 30
    },
    text:{
        fontSize: 20,
        color: 'black'
    }  
});