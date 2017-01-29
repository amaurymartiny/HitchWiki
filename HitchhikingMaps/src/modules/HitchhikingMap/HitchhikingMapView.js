import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigation } from '@exponent/ex-navigation';
import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as Actions from './HitchhikingMapState';

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
    const annotations= [{
  coordinates: [40.72052634, -73.97686958312988],
  type: 'point',
  title: 'This is marker 1',
  subtitle: 'It has a rightCalloutAccessory too',
  rightCalloutAccessory: {
    source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
    height: 25,
    width: 25
  },
  annotationImage: {
    source: { uri: 'https://cldup.com/CnRLZem9k9.png' },
    height: 25,
    width: 25
  },
  id: '22203'
}, {
  coordinates: [40.714541341726175,-74.00579452514648],
  type: 'point',
  title: 'Important',
  subtitle: 'Neat, this is a custom annotation image',
  rightCalloutAccessory: {
    source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
    height: 25,
    width: 25
  },
  annotationImage: {
    source: { uri: 'https://cldup.com/7NLZklp8zS.png' },
    height: 25,
    width: 25
  },
  id: '22202'
}];
    return (
      <View style={styles.fullScreen}>
        <MapView
          initialZoomLevel={10}
          initialCenterCoordinate={{latitude: 40.72052634, longitude: -73.97686958312988}}
          style={styles.fullScreen}
          showsUserLocation={true}
          annotations={annotations}
          onRightAnnotationTapped={payload => this._goToSpotDetails(payload.id)}
        />
        {/*
        <Button
          onPress={() => this.props.dispatch(Actions.fetchCountries())}
          title="GET COUNTRIES"
        />
        <Button 
          onPress={() => this.props.dispatch(Actions.fetchPoints())}
          title="GET POINTS"
        />
        <Button
          onPress={this._goToSpotDetails}
          title="SEE POINT DETAILS"
        />
        */}
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
