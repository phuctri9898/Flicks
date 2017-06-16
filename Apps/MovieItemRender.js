import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    height:24
  },
  description: {
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
    marginTop: 5,
    height:70
  },
});
export default class MovieItemRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: props.dataProvider
    };
  }
  prefix = 'https://image.tmdb.org/t/p/w45';
  render() {
    let url = this.prefix+this.state.dataProvider.poster_path;
    var {height, width} = Dimensions.get('window');
    console.log("window:"+height+", "+width);
    return (
      <View style={{width:width, height:118, flexDirection:'row'}}>
          <Image
            style={{width:75, height:106, marginLeft:10}}
            source={{uri: url}}>
          </Image>
          <View style={{width:width - 95, height:118, flexDirection:'column', marginLeft:10}}>
            <Text
              style={styles.title}
              ellipsizeMode='tail'
              numberOfLines={1}>
              {this.state.dataProvider.title}
            </Text>
            <Text
              style={styles.description}
              ellipsizeMode='tail'
              numberOfLines={5}>
              {this.state.dataProvider.overview}
            </Text>
          </View>
      </View>
    )
  }
}
