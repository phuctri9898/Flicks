/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import ListPage from './Apps/ListPage.js';
import DetailPage from './Apps/DetailPage.js';

export default class Flicks extends Component {
  render() {
    return (
      <Navigator
        

        initialRoute={{id: 'ListPage', title: 'DetailPage'}}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'ListPage':
              return (
                <ListPage navigator={navigator} {... route.props}/>
              );
              break;
            case 'DetailPage':
              return (
                <DetailPage navigator={navigator} {... route.props}/>
              );
              break;
            default:
          }
        }}
    />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Flicks', () => Flicks);
