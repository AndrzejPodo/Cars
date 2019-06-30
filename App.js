/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Button, View} from 'react-native';
import OdometerInputView from './views/odometerInputView'
import CarSelectView from './views/CarSelectView'
import TripStartView from './views/TripStartView';
import {createStackNavigator, createAppContainer} from 'react-navigation';


const MainNavigator = createStackNavigator({
  CarSelectView: {screen: CarSelectView},
  TripStartView: {screen: TripStartView},
  OdometerInputView: {screen: OdometerInputView}
},{
  defaultNavigationOptions: {
    header: null  
  }, 
});

const App = createAppContainer(MainNavigator);

export default App;
// export default class App extends Component{
//   render(){
//     return(
//       <CarSelectView></CarSelectView>
//     )
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#56CCF2',
//   }
// });
