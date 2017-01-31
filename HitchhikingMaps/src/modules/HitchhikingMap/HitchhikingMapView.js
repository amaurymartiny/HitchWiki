import React, { PropTypes } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { MapView } from 'react-native-mapbox-gl';
import ProgressPie from 'react-native-progress/Pie';

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

  goToOfflineMaps = () => {
    this.props.navigator.push('offlineMaps');
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
        <View style={styles.fbaBottomLeft}>
          {(this.props.progress && this.props.progress.countOfResourcesCompleted < this.props.progress.countOfResourcesExpected) ?
            <TouchableOpacity style={styles.progress} onPress={this.goToOfflineMaps}>
              <ProgressPie
                style={styles.raised}
                indeterminate={!this.props.progress.countOfResourcesCompleted}
                color={theme.red}
                unfilledColor="white"
                showsText={true}
                progress={this.props.progress.countOfResourcesCompleted / this.props.progress.countOfResourcesExpected}
                size={52}
              />
            </TouchableOpacity>
          :
            <Icon
              reverse
              raised
              name="cloud-download"
              color={theme.red}
              onPress={() => {
                this._map.getBounds(bounds => {
                  this.props.dispatch(saveOfflineMap(bounds, this.props.zoomLevel, this.props.annotations))
                });
              }}
            />
          }
        </View>
        <View style={styles.fbaBottomRight}>
          <Icon
            reverse={!this.props.location.isFetching}
            raised
            name="my-location"
            color={theme.red}
            onPress={() => this.props.dispatch(getLocation(this._map))}
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
  fbaBottomRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  fbaBottomLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 20,
    bottom: 20
  },
  progress: {
    left: 8,
    bottom: 8,
    zIndex: 10
  },
  raised: { // https://github.com/react-native-community/react-native-elements/blob/master/src/icons/Icon.js
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 2
      }
    })
  }
});

export default HitchhikingMapView;
