import React from 'react';
import { View, StyleSheet } from 'react-native';

import theme from '../../services/ThemeService';
import MessageBarViewContainer from '../../containers/MessageBar/MessageBarViewContainer';

class Background extends React.Component {

  render() {
    return (
      <View style={styles.fullScreen}>
        {this.props.children}
        <MessageBarViewContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default Background;
