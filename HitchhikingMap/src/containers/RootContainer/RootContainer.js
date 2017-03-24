import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'

import AppNavigator from '../../AppNavigator';
import MessageBarViewContainer from '../MessageBar/MessageBarViewContainer';

class RootContainer extends React.Component {
  render () {
    return (
      <View style={styles.fullScreen}>
        <AppNavigator />
        <MessageBarViewContainer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  }
});


export default connect()(RootContainer)