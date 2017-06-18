import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import BottomTabBarNavigator from './BottomTabBarNavigator.js';

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.itemClickHandler = this.itemClickHandler.bind(this);
  }

  render() {
    return (
      <BottomTabBarNavigator itemClickHandler={this.itemClickHandler}/>
    );
  }

  itemClickHandler(itemData){
    console.log("ListPage itemClickHandler:"+JSON.stringify(itemData));
    this.props.navigator.push({id:'DetailPage', props:{itemData:itemData}});
  }
}
