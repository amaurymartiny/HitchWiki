/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import SimpleOnboarding from 'react-native-simple-onboarding';

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
    },
  }

  static propTypes = {
    navigation: React.PropTypes.shape({
      dispatch: React.PropTypes.func.isRequired,
    }).isRequired,
  }

  navigateBack() {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  render() {
    const pageArray = [{
      title: 'Zoom',
      subtitle: 'into the app to see spots',
      image: <Image source={tutorial1} style={[styles.image, { borderRadius: 40 }]} />,
      // description: 'into the map to see spots',
      // img: require('../../../assets/images/tutorial/1.gif'),
      // img: tutorial1,
      // imgStyle: {
      //   height: 240,
      //   width: 240,
      //   borderRadius: 40,
      // },
      backgroundColor: theme.red,
      // fontColor: 'white',
      // level: 15,
    }, {
      title: 'Spots',
      subtitle: 'have different ratings',
      image: <Image source={tutorial2} style={styles.image} />,
      // description: 'have different ratings',
      // img: require('../../../assets/images/tutorial/2.png'),
      // img: tutorial2,
      // imgStyle: {
      //   height: 240,
      //   width: 240,
      // },
      backgroundColor: theme.blue,
      // fontColor: 'white',
      // level: 15,
    },
    {
      title: 'Offline',
      subtitle: 'You can save spots offline and take snapshots of the map',
      image: <Image source={tutorial3} style={styles.image} />,
      // description: 'You can save spots offline and take snapshots of the map',
      // // img: require('../../../assets/images/tutorial/3.png'),
      // img: tutorial3,
      // imgStyle: {
      //   height: 240,
      //   width: 240,
      // },
      backgroundColor: theme.green,
      // fontColor: 'white',
      // level: 15,
    }];
    return (
      <SimpleOnboarding
        pages={pageArray}
        onEnd={() => this.navigateBack()}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 240,
    height: 240,
  },
});


export default Onboarding;
