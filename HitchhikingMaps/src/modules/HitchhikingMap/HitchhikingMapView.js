import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from '@exponent/ex-navigation';
import Mapbox, { MapView } from 'react-native-mapbox-gl';

import { fetchSpots, getLocation, setLocation, setZoomLevel } from './HitchhikingMapState';
import theme from '../../config/theme';

Mapbox.setAccessToken('pk.eyJ1IjoibWFuaWFhcm15eXVydCIsImEiOiJjaXk4dHIxbDgwMDF0MzNxam95ZXFsM2N1In0.P8-GnGGEQKXRTzklDE73Xw');

@withNavigation
class HitchhikingMapView extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  _map: Object = null

  static propTypes = {
    annotations: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    zoomLevel: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevState) {
    if (prevState.location.latitude !== this.props.location.latitude
      || prevState.location.longitude !== this.props.location.longitude) {
      this._map.setCenterCoordinate(this.props.location.latitude, this.props.location.longitude);
    }
  }

  // TODO I don't like this
  goToSpotDetails = (spotId) => {
    this.props.navigator.push('spotDetails', { spotId });
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <MapView
          initialZoomLevel={this.props.zoomLevel}
          initialCenterCoordinate={this.props.location}
          style={styles.fullScreen}
          showsUserLocation
          annotations={this.props.annotations}
          onRightAnnotationTapped={payload => this.goToSpotDetails(payload.id)}
          onRegionDidChange={
            payload => {
              // update current location and zoomLevel
              this.props.dispatch(setZoomLevel(payload.zoomLevel));
              // this.props.dispatch(setLocation(payload.latitude, payload.longitude));
              // update spots in between bounds
              payload.zoomLevel > 10 && this._map.getBounds(bounds => {
                this.props.dispatch(fetchSpots(bounds));
              });
            }
          }
          logoIsHidden={true}
          ref={map => { this._map = map; }}
        />
        <View style={styles.fba}>
        <Icon
          reverse
          raised
          name='cloud-download'
          color={theme.red}
          onPress={() => console.log('hello')}
          
        />
        <Icon
          reverse
          raised
          name='my-location'
          color={theme.red}
          onPress={() => this.props.dispatch(getLocation())}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignSelf: 'stretch',
  },
  fba: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20,
    bottom: 20
  }
});

export default HitchhikingMapView;
