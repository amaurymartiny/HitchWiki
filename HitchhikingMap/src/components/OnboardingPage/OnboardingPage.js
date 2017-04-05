/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';

class Onboarding extends React.Component {
  static navigationOptions = {
    title: 'Quick Tutorial',
    header: {
      visible: false,
    },
  }

  render() {
    return (
        <Text>Hello</Text>
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
