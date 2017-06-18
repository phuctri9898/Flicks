import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import MovieItemRender from './MovieItemRender.js'
const width = Dimensions.get('window').width;
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
  },
  separator:{
    width:width,
    height:1,
    backgroundColor:'white'}
});

export default class ListMovie extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      apiLink:props.dataProvider.apiLink,
      dataSource: ds.cloneWithRows([]),
      dataProvider:[]
    };
  }

  render() {
    return (
      <ListView contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.itemRender(rowData)}
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
        enableEmptySections={true}
      />
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return (
      <View style={styles.separator}
      key={rowID}/>
    );
  }
  itemRender (rowData){
    return (
      <TouchableHighlight onPress={() => {
          this.itemCLickHandler(rowData);
        }}>
        <MovieItemRender dataProvider={rowData} />
      </TouchableHighlight>
    );
  }

  itemCLickHandler(rowData)
  {
    console.log("ListMovie itemClickHandler:"+this.props.itemClickHandler);
    this.props.itemClickHandler(rowData);
  }
  componentWillMount(){
    this.getMoviesFromApiAsync();
  }

  getMoviesFromApiAsync() {
    return fetch(this.state.apiLink)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            fullListData: responseJson.results,
            dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
          }
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchTextChange(text)
  {
    console.log("filter: "+text);
    var arrFilter;
    if(text == null || text.empty)
    {
      arrFilter = this.state.fullListData.slice(0);
    }
    else {
      arrFilter=[];
      var item;
      var title;
      var desc;
      console.log("fullListData:"+this.state.fullListData.length);
      for(i=0; i < this.state.fullListData.length; i++)
      {
        item = this.state.fullListData[i];
        title = item.title.toLowerCase();
        desc = item.overview.toLowerCase();
        if(title.search(text.toLowerCase()) > -1 || desc.search(text.toLowerCase()) > -1){
          console.log("match item:"+i);
          arrFilter.push(item);
        }
      }

    }
    console.log("arrFilter:"+arrFilter.length);
    this.setState(
      {
        dataSource: this.state.dataSource.cloneWithRows(arrFilter)
      }
    )
  }
}
