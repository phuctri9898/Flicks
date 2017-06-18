import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight
} from 'react-native';

import MovieItemRender from './MovieItemRender.js'

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
        enableEmptySections={true}
      />
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
            dataProvider: responseJson.results,
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
      arrFilter = this.state.dataProvider;
    }
    else {
      arrFilter=[];
      var item;
      var title;
      var desc
      for(i=0; i< this.state.dataProvider.length; i++)
      {
        item = this.state.dataProvider[i];
        title = item.title.toLowerCase();
        desc = item.overview.toLowerCase();
        if(title.search(text.toLowerCase()) !== -1 || desc.search(text.toLowerCase()) !== -1){
          arrFilter.push(item);
        }
      }
    }


    this.setState(
      {
        dataSource: this.state.dataSource.cloneWithRows(arrFilter)
      }
    )
  }
}
