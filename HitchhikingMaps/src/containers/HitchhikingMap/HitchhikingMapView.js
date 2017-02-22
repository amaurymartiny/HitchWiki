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
    // region: PropTypes.object.isRequired,
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
    // Some helper functions to show correctly the markers

    // Print as text number of stars
    function drawStars(number) {
      return '★'.repeat(number) + '☆'.repeat(5 - number);
    }
    // // Find the right marker image according to rating
    // function getMarkerImage(number) {
    //   switch (number) {
    //     case 5:
    //       return require('../../../images/annotation5.png'); // eslint-disable-line
    //     case 4:
    //       return require('../../../images/annotation4.png'); // eslint-disable-line
    //     case 3:
    //       return require('../../../images/annotation3.png'); // eslint-disable-line
    //     case 2:
    //       return require('../../../images/annotation2.png'); // eslint-disable-line
    //     default:
    //       return require('../../../images/annotation1.png'); // eslint-disable-line
    //   }
    // }
    function getPinColor(number) {
      switch (number) {
        case 2:
          return 'pink';
        case 3:
          return 'yellow';
        case 4:
          return 'green';
        case 5:
          return 'blue';
        default:
          return 'red';
      }
    }

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
              description="See Description &rarr;"
              title={drawStars(marker.rating)}
              pinColor={getPinColor(marker.rating)}
              onCalloutPress={() => this.props.navigation.navigate('spotDetails', { spotId: marker.id })}
            />
          ))}
        </MapView>
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
