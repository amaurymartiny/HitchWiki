import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'

class RootContainer extends React.Component {
  render () {
    return (
      <View style={styles.fullScreen}>
        <Text>HELLO</Text>
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
