import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigation } from '@exponent/ex-navigation';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { fetchSpots } from './HitchhikingMapState';

Mapbox.setAccessToken('pk.eyJ1IjoibWFuaWFhcm15eXVydCIsImEiOiJjaXk4dHIxbDgwMDF0MzNxam95ZXFsM2N1In0.P8-GnGGEQKXRTzklDE73Xw');

@withNavigation
class HitchhikingMapView extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  // TODO I don't like this
  _goToSpotDetails = spotId => {
    this.props.navigator.push('spotDetails', { spotId });
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <MapView
          initialZoomLevel={10}
          initialCenterCoordinate={{latitude: 40.72052634, longitude: -73.97686958312988}}
          style={styles.fullScreen}
          showsUserLocation={true}
          annotations={this.props.annotations}
          onRightAnnotationTapped={payload => this._goToSpotDetails(payload.id)}
          onRegionDidChange={
            payload => {
              payload.zoomLevel > 10 && this.props.dispatch(fetchSpots([
                payload.latitude + 1,
                payload.longitude + 1,
                payload.latitude - 1,
                payload.longitude - 1
              ]));
            }
          }
          logoIsHidden={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

export default HitchhikingMapView;
