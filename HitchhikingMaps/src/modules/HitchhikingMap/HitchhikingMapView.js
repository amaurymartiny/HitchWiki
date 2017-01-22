import React, {PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as NavigationState from '../../modules/navigation/NavigationState';

/**
 * Sample view to demonstrate navigation patterns.
 * @TODO remove this module in a live application.
 */
const HitchhikingMapView = React.createClass({
  propTypes: {
    // index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  onNextPress() {
    const index = this.props.index;
    this.props.dispatch(NavigationState.pushRoute({
      key: `Color_${index + 1}`,
      title: `Color Screen #${index + 1}`
    }));
  },

  render() {
    const text = `This is not a map.`;
    return (
      <View style={[styles.container]}>
        <Text onPress={this.onNextPress}>
          {text}
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HitchhikingMapView;
