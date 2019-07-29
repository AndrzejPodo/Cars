import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, TextInput} from 'react-native'

export default class InputFiled extends Component {
    render(){
        return(
            <View minWidth = {this.props.minWidth} style = {styles.container}>
                <TextInput autoCapitalize={this.props.autoCapitalize}  autoCompleteType = {this.props.autoCompleteType} secureTextEntry={this.props.secureTextEntry} style = {styles.text} placeholder = {this.props.text} onChangeText = {this.props.onChangeText}></TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        height: 60,
        borderRadius: 15,
        backgroundColor: "white",
        marginBottom: 20
    },
    text: {
        fontSize: 20
    }
});
