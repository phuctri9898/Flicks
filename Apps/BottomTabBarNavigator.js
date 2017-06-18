/* @flow */

import React, { PureComponent } from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import type { NavigationState } from 'react-native-tab-view/types';

import SinglePage from './tab/SinglePage.js';

type Route = {
  key: string,
  title: string,
  icon: string,
};

type State = NavigationState<Route>;

export default class BottomTabBarNavigator extends PureComponent<void, *, State> {
  static title = 'Bottom bar with indicator';
  static appbarElevation = 4;

  state: State = {
    index: 0,
    routes: [
      { key: '1', title: 'Now Playing', icon: './image/movie_icon.png' },
      { key: '2', title: 'Top Rated', icon: './image/star_icon.png' }
    ],
  };

  _handleChangeTab = index => {
    this.setState({
      index,
    });
  };

  _renderIndicator = props => {
    const { width, position } = props;

    const translateX = Animated.multiply(position, width);

    return (
      <Animated.View
        style={[styles.container, { width, transform: [{ translateX }] }]}
      >
        <View style={styles.indicator} />
      </Animated.View>
    );
  };

  _renderIcon = ({ route }) => {
    return <Image
      source={require('./image/movie_icon.png')}
      size={24}
      style={tabBarStyles.icon} />;
  };

  _renderLabel = ({ route }) => {
    return <Text style={tabBarStyles.label}>{route.title}</Text>;
  };
  // _renderBadge = ({ route }) => {
  //   if (route.key === '2') {
  //     return (
  //       <View style={styles.badge}>
  //         <Text style={styles.count}>42</Text>
  //       </View>
  //     );
  //   }
  //   return null;
  // };

  _renderFooter = props => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        renderLabel={this._renderLabel}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
      />
    );
  };



  _renderScene = ({ route }) => {
    const apis=["https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed",
                "https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed"];

    switch (route.key) {
      case '1':
        var params = {apiLink:apis[0]};
        console.log("tabbar");
        console.log(params);
        return (
          <SinglePage
            dataProvider={params}
            state={this.state}
            style={{ backgroundColor: '#ff4081' }}
          />
        );
      case '2':
        var params = {apiLink:apis[1]}
        return (
          <SinglePage
            dataProvider={params}
            state={this.state}
            style={{ backgroundColor: '#673ab7' }}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const tabBarStyles = StyleSheet.create({
  label: {
    fontSize:10
  },
  icon: {
    backgroundColor: 'transparent',
    width: 32,
    height: 32,
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    padding: 0,
  },

  indicator: {
    flex: 1,
    backgroundColor: '#0084ff',
    margin: 4,
    borderRadius: 2,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
