import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
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
      dataSource: ds.cloneWithRows([])
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
      <MovieItemRender dataProvider={rowData} />
    );
  }

  componentWillMount(){
    this.getMoviesFromApiAsync();
  }

  getMoviesFromApiAsync() {
    return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("load API done");
        this.setState(
          {
            dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
          }
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
