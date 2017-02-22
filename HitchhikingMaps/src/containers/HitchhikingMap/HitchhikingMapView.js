import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
// import { MapView } from 'react-native-mapbox-gl';
// import ProgressPie from 'react-native-progress/Pie';
import ActionButton from 'react-native-action-button';
// import { withConnection, connectionShape } from 'react-native-connection-info';
import MapView from 'react-native-maps';


import { HitchhikingMapActions } from '../../ducks/HitchhikingMap';
// import { fetchOfflineMaps, saveOfflineMap, saveOfflineMapProgress } from '../OfflineMaps/OfflineMapsState';
import theme from '../../services/ThemeService';

// @withConnection
class HitchhikingMapView extends React.Component {

  static navigationOptions = {
    title: 'Offline Spots'
  }

  static propTypes = {
    markers: PropTypes.array.isRequired,
    region: PropTypes.object.isRequired,
    isFetchingGPS: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    // connection: connectionShape
  }

  componentDidMount() {
    this.props.dispatch(HitchhikingMapActions.getLocation(this.refs.map));
  }

  // componentDidMount() {
  //   // Subsribe to downloading offline map progress
  //   // didn't find a way to do this inside saga
  //   this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
  //     this.props.dispatch(saveOfflineMapProgress(progress));
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   // detect a network change, fetch offline annotations if no internet
  //   (this.props.connection.isConnected && !nextProps.connection.isConnected) && this.props.dispatch(fetchOfflineMaps());
  // }


  // componentWillUnmount() {
  //   this._offlineProgressSubscription.remove();
  // }

  render() {
    return (
      <View style={styles.fullScreen}>
        <MapView
          ref="map"
          style={styles.fullScreen}
          showsUserLocation
          onRegionChange={region => {
            if (region.latitudeDelta > 1 || region.longitudeDelta > 1) return;
            this.props.dispatch(HitchhikingMapActions.fetchSpots(region));
          }}
        >
          {this.props.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.latlng}
              title={marker.title}
            />
          ))}
        </MapView>
        {/*<MapView
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
        />*/}
        {/*
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
        */}
        <ActionButton
          position="right"
          buttonColor={this.props.isFetchingGPS ? 'white' : theme.red}
          icon={
            <Icon name="my-location" color={this.props.isFetchingGPS ? theme.red : 'white'} />
          }
          onPress={() => this.props.dispatch(HitchhikingMapActions.getLocation(this.refs.map))}
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
  }
});

export default HitchhikingMapView;
