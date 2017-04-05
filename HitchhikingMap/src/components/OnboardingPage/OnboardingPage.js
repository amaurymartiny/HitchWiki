/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Text } from 'react-native-elements';
import AppIntro from 'react-native-app-intro';

import theme from '../../services/ThemeService';

import tutorial1 from '../../../assets/images/tutorial/1.gif';
import tutorial2 from '../../../assets/images/tutorial/2.png';
import tutorial3 from '../../../assets/images/tutorial/3.png';

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
      // img: require('../../../assets/images/tutorial/1.gif'),
      img: tutorial1,
      imgStyle: {
        height: 240,
        width: 240,
        borderRadius: 40,
      },
      backgroundColor: theme.red,
      fontColor: 'white',
      level: 1,
    }, {
      title: 'Spots',
      description: 'have different ratings',
      // img: require('../../../assets/images/tutorial/2.png'),
      img: tutorial2,
      imgStyle: {
        height: 240,
        width: 240,
      },
      backgroundColor: theme.blue,
      fontColor: 'white',
      level: 1,
    }
    , {
      title: 'Offline',
      description: 'You can save spots offline and take snapshots of the map',
      // // img: require('../../../assets/images/tutorial/3.png'),
      img: tutorial3,
      imgStyle: {
        height: 240,
        width: 240,
      },
      backgroundColor: theme.green,
      fontColor: 'white',
      level: 1,
    }
    ];
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
