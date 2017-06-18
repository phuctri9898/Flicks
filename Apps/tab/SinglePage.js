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
    this.state = {
      apiLink:props.dataProvider.apiLink
    };
    this.itemClickHandler = this.itemClickHandler.bind(this);
  }

  render() {
    var params ={apiLink:this.state.apiLink};
    return (
      <View>
        <TextInput
        style={{backgroundColor:'white'}}
        onChangeText={text => this.searchTextChange(text)}
        placeholder='search'
        placeholderTextColor='gray'
        inlineImageLeft='../image/search_icon.png'
        inlineImagePadding={20}/>

        <ListMovie style={{backgroundColor:'orange'}}
          dataProvider={params}
          itemClickHandler={this.itemClickHandler}
          ref={(view) => {this.listMovie = view;} }/>
      </View>
    );
  }

  itemClickHandler(itemData){
    console.log("SinglePage itemClickHandler:"+this.props.itemClickHandler);
    this.props.itemClickHandler(itemData);
  }

  searchTextChange(text)
  {
    if(this.listMovie)
    {
      this.listMovie.searchTextChange(text);
    }
  }
}
