/* eslint-disable global-require */
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';

import { AppActions } from '../../ducks/App';
import { HMapActions } from '../../ducks/HMap';
import { SnapshotsActions } from '../../ducks/Snapshots';

import theme from '../../services/ThemeService';

class HMapView extends React.Component {

  static navigationOptions = {
    title: 'Hitchhiking Map',
    // header: {
    //   visible: false,
    // },
  }

  static propTypes = {
    appLoaded: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    isFetchingGPS: React.PropTypes.bool.isRequired,
    isFetchingSpots: React.PropTypes.bool.isRequired,
    markers: React.PropTypes.array.isRequired,
    navigation: React.PropTypes.object.isRequired,
    region: React.PropTypes.object.isRequired,
    showTutorial: React.PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(HMapActions.getLocationRequest());
  }

  componentDidUpdate() {
    if (this.props.appLoaded && this.props.showTutorial) {
      this.props.dispatch(AppActions.setShowTutorial(false));
      this.props.navigation.navigate('onboarding');
    }
  }

  /**
   * Generate the markers array to be shown on the map
   * @return {<MapView.Marker>[]} [description]
   */
  generateMarkers() {
    // Some helper functions to show correctly the markers

    /**
     * Print as text number of stars
     * @param  {[type]} number [description]
     * @return {[type]}        [description]
     */
    function drawStars(number) {
      return '★'.repeat(number) + '☆'.repeat(5 - number);
    }
    /**
     * Get corresponding pin for each rating
     * @param  {[type]} number Average Rating
     * @return {[type]}        Image
     */
    function getPinImage(number) {
      switch (number) {
        case 3:
          return require('../../../assets/images/markers/3.png');
        case 4:
          return require('../../../assets/images/markers/4.png');
        case 5:
          return require('../../../assets/images/markers/5.png');
        default:
          return require('../../../assets/images/markers/2.png');
      }
    }

    // ref={`marker-${marker.id}`}
    // onPress={() => this.refs[`marker-${marker.id}`].showCallout()}
    return this.props.markers.map(marker => (
      <MapView.Marker
        key={marker.id}
        coordinate={marker.latlng}
        description="See Description &rarr;"
        title={drawStars(marker.rating)}
        centerOffset={{ x: 1, y: 1 }}
        image={getPinImage(marker.rating)}
        onCalloutPress={() => this.props.navigation.navigate('spotDetails', {
          spotId: marker.id,
          latlng: marker.latlng,
        })}
      >
        {/* <Image source={getPinImage(marker.rating)} style={{ width: 32, height: 32}} />*/}
      </MapView.Marker>
    ));
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <MapView
          ref="map"
          style={styles.fullScreen}
          region={this.props.region}
          showsUserLocation
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          onRegionChange={(region) => {
            this.props.dispatch(HMapActions.setRegion(region));
          }}
        >
          {this.props.isFetchingSpots ? <View /> : this.generateMarkers()}
        </MapView>
        <ActionButton
          position="left"
          buttonColor={theme.red}
          icon={this.props.isFetchingSpots ?
            <ActivityIndicator color="white" />
          :
            <Icon type="ionicon" name="ios-camera" color="white" />
          }
        >
          <ActionButton.Item
            buttonColor={theme.red}
            title="Take Snapshot"
            onPress={() => {
              const snapshot = this.refs.map.takeSnapshot({});
              this.props.dispatch(SnapshotsActions.saveSnapshotRequest(snapshot));
            }}
          >
            <Icon type="ionicon" name="ios-image" color="white" />
          </ActionButton.Item>
        </ActionButton>
        <ActionButton
          position="right"
          buttonColor={this.props.isFetchingGPS ? 'white' : theme.red}
          icon={
            <Icon name="my-location" color={this.props.isFetchingGPS ? theme.red : 'white'} />
          }
          onPress={() => this.props.dispatch(HMapActions.getLocationRequest())}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HMapView;
