import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button
} from 'react-native';
const lowPrefix = 'https://image.tmdb.org/t/p/w45';
const highPrefix = 'https://image.tmdb.org/t/p/original';
export default class DetailPage extends Component {

  constructor(props) {
    super(props);
    this.onBackClick = this.onBackClick.bind(this);
  }


 onBackClick(){
   this.props.navigator.pop();
 }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Button
            style={styles.headerButton}
            onPress={this.onBackClick}
            title="<Back"
            color="orange"
            />
        </View>
        <Image
          style={styles.image}
          source={{uri: highPrefix+this.props.itemData.poster_path}}
        >
          <View style={styles.descBg}>
            <Text style={styles.title}>{this.props.itemData.title}</Text>
            <Text style={styles.date}>{this.props.itemData.release_date}</Text>
            <Text style={styles.vote}>Vote {this.props.itemData.vote_average}</Text>
            <Text style={styles.description}>Vote {this.props.itemData.overview}</Text>
          </View>
        </Image>
      </View>
    );
  }
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  header: {
    width:width,
    height:30,
  },
  headerButton: {
    width:30,
    height:30,
  },
  image: {
    width:width,
    height:height,
  },
  icon: {
    backgroundColor: 'transparent',
    width: 32,
    height: 32,
  },
  descBg: {
    flexDirection: 'column',
    width: width - 20,
    height: 300,
    marginLeft: 10,
    marginTop: height - 300,
    backgroundColor: 'black',
    opacity: 0.6,
  },
  title: {
    color:'white',
    fontSize: 20,
    textAlign: 'left',
    height:24
  },
  date: {
    color:'white',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 5,
  },
  vote: {
    color:'white',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 5,
  },
  description: {
    color:'white',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 5,
  },
});
