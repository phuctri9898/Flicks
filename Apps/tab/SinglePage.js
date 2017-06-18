import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  Image
} from 'react-native';

import ListMovie from '../ListMovie.js';
const styles = StyleSheet.create({
  list: {
      flexDirection: 'column',
      //flexWrap: 'wrap',
      backgroundColor: 'orange'
  },
  item: {
      margin: 3,
      width: 150,
      height: 150
  }
});

export default class SinglePage extends Component {
  constructor(props) {
    super(props);
    console.log("SinglePage");
    console.log(props.dataProvider);
    this.state = {
      apiLink:props.dataProvider.apiLink
    };
  }

  render() {
    var params ={apiLink:this.state.apiLink};
    return (
      <View>
        <TextInput
        onChangeText={text => this.searchTextChange(text)}
        placeholder='search'
        placeholderTextColor='gray'
        inlineImageLeft='./image/search_icon.png'/>

        <ListMovie dataProvider={params}/>
      </View>
    );
  }

  searchTextChange(text)
  {

  }
}
