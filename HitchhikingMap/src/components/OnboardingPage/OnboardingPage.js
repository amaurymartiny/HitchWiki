/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Text } from 'react-native-elements';
import AppIntro from 'react-native-app-intro';

import theme from '../../services/ThemeService';

class Onboarding extends React.Component {

  static navigationOptions = {
    title: 'Quick Tutorial',
    cardStack: {
      gesturesEnabled: false,
    },
    header: {
      visible: false,
    },
    tabBar: {
      visible: false,
    }
  }

  navigateToHMap() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    const pageArray = [{
      title: 'Zoom',
      description: 'into the map to see spots',
      img: require('../../../assets/images/tutorial/1.gif'),
      imgStyle: {
        height: 240,
        width: 240,
        borderRadius: 50,
      },
      backgroundColor: theme.red,
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Spots',
      description: 'have different ratings',
      img: require('../../../assets/images/tutorial/2.png'),
      imgStyle: {
        height: 240,
        width: 240,
      },
      backgroundColor: theme.blue,
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Spots',
      description: 'have different ratings',
      img: require('../../../assets/images/tutorial/2.png'),
      imgStyle: {
        height: 240,
        width: 240,
      },
      backgroundColor: theme.green,
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onDoneBtnClick={this.navigateToHMap.bind(this)}
        onSkipBtnClick={this.navigateToHMap.bind(this)}
        pageArray={pageArray}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   description: {
//     textAlign: 'justify',
//     marginBottom: 20,
//   },
//   logo: {
//     width: 128,
//     height: 128,
//     marginBottom: 20,
//   },
//   center: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


export default Onboarding;
