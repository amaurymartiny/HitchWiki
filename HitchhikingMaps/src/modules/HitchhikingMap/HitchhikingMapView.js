import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigation } from '@exponent/ex-navigation';
import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as Actions from './HitchhikingMapState';

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

  componentDidMount() {
    Mapbox.setAccessToken('pk.eyJ1IjoibWFuaWFhcm15eXVydCIsImEiOiJjaXk4dHIxbDgwMDF0MzNxam95ZXFsM2N1In0.P8-GnGGEQKXRTzklDE73Xw');
  }

  // TODO I don't like this
  _goToSpotDetails = () => {
    this.props.navigator.push('spotDetails', { id: 22202 });
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <MapView
          initialZoomLevel={10}
          initialCenterCoordinate={{latitude: 40.444328, longitude: -79.953155}}
          style={styles.fullScreen}
          showsUserLocation={true}
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
