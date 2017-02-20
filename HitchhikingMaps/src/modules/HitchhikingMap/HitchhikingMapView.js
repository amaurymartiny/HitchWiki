import React, { PropTypes } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { MapView } from 'react-native-mapbox-gl';
import ProgressPie from 'react-native-progress/Pie';
import ActionButton from 'react-native-action-button';
import { withConnection, connectionShape } from 'react-native-connection-info';

import Mapbox from '../../services/Mapbox';
import { fetchSpots, getLocation, setLocation, setZoomLevel, } from './HitchhikingMapState';
import { fetchOfflineMaps, saveOfflineMap, saveOfflineMapProgress } from '../OfflineMaps/OfflineMapsState';
import theme from '../../services/ThemeService';

@withConnection
class HitchhikingMapView extends React.Component {

  static navigationOptions = {
    title: 'Offline Spots'
  }

  static propTypes = {
    annotations: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    zoomLevel: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    connection: connectionShape
  }

  componentDidMount() {
    // Subsribe to downloading offline map progress
    // didn't find a way to do this inside saga
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      this.props.dispatch(saveOfflineMapProgress(progress));
    });
  }

  componentWillReceiveProps(nextProps) {
    // detect a network change, fetch offline annotations if no internet
    (this.props.connection.isConnected && !nextProps.connection.isConnected) && this.props.dispatch(fetchOfflineMaps());
  }


  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <MapView
          initialZoomLevel={this.props.zoomLevel}
          initialCenterCoordinate={this.props.location}
          style={styles.fullScreen}
          showsUserLocation={true}
          annotations={this.props.connection.isConnected ? this.props.annotations : this.props.offlineAnnotations}
          onRightAnnotationTapped={payload => this.props.navigation.navigate('spotDetails', { spotId: payload.id })}
          onRegionDidChange={payload => {
            // update current location and zoomLevel
            this.props.dispatch(setZoomLevel(payload.zoomLevel));
            // this.props.dispatch(setLocation(payload.latitude, payload.longitude));
            // update spots in between bounds
            this.props.connection.isConnected && payload.zoomLevel > 8 && this._map.getBounds(bounds => {
              this.props.dispatch(fetchSpots(bounds));
            });
          }}
          logoIsHidden={true}
          ref={map => { this._map = map; }}
        />
        {this.props.connection.isConnected && <ActionButton position="left" buttonColor={theme.red}>
          {(this.props.progress && this.props.progress.countOfResourcesCompleted < this.props.progress.countOfResourcesExpected) ?
            <ActionButton.Item
              buttonColor={theme.red}
              title="Download Offline Map"
              onPress={() => this.props.navigation.navigate('offlineMaps')}
            >
              <ProgressPie
                style={styles.raised}
                indeterminate={!this.props.progress.countOfResourcesCompleted}
                color={theme.red}
                unfilledColor="white"
                showsText={true}
                progress={this.props.progress.countOfResourcesCompleted / this.props.progress.countOfResourcesExpected}
                size={56}
              />
            </ActionButton.Item>
          :
            <ActionButton.Item
              buttonColor={theme.red}
              title="Download Offline Map"
              onPress={() => {
                this._map.getBounds(bounds => {
                  this.props.dispatch(saveOfflineMap(bounds, this.props.zoomLevel, this.props.annotations))
                });
              }}
            >
              <Icon type="ionicon" name="ios-cloud-download" color="white" />
            </ActionButton.Item>
          }
        </ActionButton>}
        <ActionButton
          position="right"
          buttonColor={this.props.location.isFetching ? 'white' : theme.red}
          icon={
            <Icon name="my-location" color={this.props.location.isFetching ? theme.red : 'white'} />
          }
          onPress={() => this.props.dispatch(getLocation(this._map))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'stretch'
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
