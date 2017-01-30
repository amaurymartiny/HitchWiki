import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { MapView } from 'react-native-mapbox-gl';

import Mapbox from '../../services/Mapbox';
import { fetchSpots, getLocation, setLocation, setZoomLevel, } from './HitchhikingMapState';
import { saveOfflineMap, saveOfflineMapProgress } from '../OfflineMaps/OfflineMapsState';
import theme from '../../services/ThemeService';

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

  componentDidMount() {
    // didn't find a way to do this inside saga
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      this.props.dispatch(saveOfflineMapProgress(progress));
    });
  }

  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
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
          // onRegionWillChange={payload => {
          //   // maximum zoomLevel is 16
          //   if (payload.zoomLevel > 16) {
          //     console.log('3234')
          //     this._map.setZoomLevel(16);
          //   }
          // }}
          onRegionDidChange={payload => {
            // update current location and zoomLevel
            this.props.dispatch(setZoomLevel(payload.zoomLevel));
            // this.props.dispatch(setLocation(payload.latitude, payload.longitude));
            // update spots in between bounds
            payload.zoomLevel > 10 && this._map.getBounds(bounds => {
              this.props.dispatch(fetchSpots(bounds));
            });
          }}
          logoIsHidden={true}
          ref={map => { this._map = map; }}
        />
        <View style={styles.fba}>
          {this.props.zoomLevel > 14 && <Icon
            reverse
            raised
            name='cloud-download'
            color={theme.red}
            onPress={() => {
              this._map.getBounds(bounds => {
                this.props.dispatch(saveOfflineMap(bounds, this.props.zoomLevel))
              });
            }}
          />}
          <Icon
            reverse
            raised
            name='my-location'
            color={theme.red}
            onPress={() => this.props.dispatch(getLocation(this._map))}
          />
          <Text>HEllo</Text>
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
    left: 20,
    bottom: 20
  }
});

export default HitchhikingMapView;
