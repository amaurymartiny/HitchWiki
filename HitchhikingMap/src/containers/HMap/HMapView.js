import React, { PropTypes } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';

import { HMapActions } from '../../ducks/HMap';
import { SnapshotsActions } from '../../ducks/Snapshots';

import theme from '../../services/ThemeService';

class HMapView extends React.Component {

  static navigationOptions = {
    title: 'Hitchhiking Map',
    header: {
      visible: false,
    },
  }

  static propTypes = {
    markers: PropTypes.array.isRequired,
    region: PropTypes.object.isRequired,
    isFetchingGPS: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(HMapActions.getLocationRequest());
  }

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
        case 2:
          return require('../../../assets/images/2.png');
        case 3:
          return require('../../../assets/images/3.png');
        case 4:
          return require('../../../assets/images/4.png');
        case 5:
          return require('../../../assets/images/5.png');
        default:
          return require('../../../assets/images/1.png');
      }
    }
    
    return this.props.markers.map(marker => (
      <MapView.Marker
        ref={`marker-${marker.id}`}
        key={marker.id}
        coordinate={marker.latlng}
        description="See Description &rarr;"
        title={drawStars(marker.rating)}
        centerOffset={{ x: 1, y: 1 }}
        onCalloutPress={() => this.props.navigation.navigate('spotDetails', { spotId: marker.id, latlng: marker.latlng })}
      >
        <Image source={getPinImage(marker.rating)} style={{ width: 32, height: 32}} />
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
          onRegionChange={region => {
            this.props.dispatch(HMapActions.setRegion(region));
          }}
        >
          {this.props.isFetchingSpots ?
            <View />
          :
            this.generateMarkers()
          }
        </MapView>
        <ActionButton
          position="left"
          buttonColor={theme.red}
          icon={<Icon type="ionicon" name="ios-camera" color="white" />}
        >
          <ActionButton.Item
            buttonColor={theme.red}
            title="Take Snapshot"
            onPress={() => {
              const snapshot = this.refs.map.takeSnapshot({});
              this.props.dispatch(SnapshotsActions.saveSnapshotRequest(snapshot))
              // snapshot
              //   .then(uri => this.props.dispatch(SnapshotsActions.saveSnapshotSuccess(uri)))
              //   .catch(error => this.props.dispatch(SnapshotsActions.saveSnapshotFailure(error)));
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
  }
});

export default HMapView;
