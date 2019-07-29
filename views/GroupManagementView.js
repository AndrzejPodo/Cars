import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import MyLabel from '../mycomponents/MyLabel'
import GroupSelectionButton from '../mycomponents/GroupSelectionButton';
import MyButton from '../mycomponents/myButton';
import DialogInput from 'react-native-dialog-input';

export default class GroupManagementView extends Component{
    
    onPress = (object)=>{
        this.props.navigation.navigate('UserManagementView',{'groupId':object.id,'groupName':object.groupName});
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
           {'name': 'Rodzina1', 'id': 1},
           {'name': 'Praca', 'id': 2},
           {'name': 'Firma', 'id':3}
        ],
        dialogVisible: false
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    }

    hindDialog = () => {
        this.setState({ dialogVisible: false });
    }

    addGroup = (groupName) => {
        alert(groupName)
    }

    render() {
        return (
            <View style = {styles.background}>
                <DialogInput isDialogVisible={this.state.dialogVisible}
                    title={"Add group"}
                    message={"Group name: "}
                    submitInput={ (inputText) => {this.addGroup(inputText)} }
                    closeDialog={ () => {this.hindDialog()}}>
                </DialogInput>
                <View width={Dimensions.get('window').width - 30} style={styles.container}>
                <MyLabel width={0.7*Dimensions.get('window').width} text = "Your groups"></MyLabel>
                <View width={0.7*Dimensions.get('window').width} style={styles.scrollVeiw}>
                        <ScrollView>
                            {
                                this.state.names.map((item)=>{
                                    return(<GroupSelectionButton
                                        id={item.id}
                                        groupName={item.name}
                                        key={item.id} 
                                        text={item.name} 
                                        color="#C4C4C4" 
                                        width = {0.6*Dimensions.get('window').width}
                                        onPress={this.onPress}
                                    />)
                                })
                            }
                         <MyButton color="#C4C4C4" width = {0.6*Dimensions.get('window').width} text="New group" onPress={this.showDialog}></MyButton>
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