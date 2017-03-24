import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
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

  render() {
    // Some helper functions to show correctly the markers

    // Print as text number of stars
    function drawStars(number) {
      return '★'.repeat(number) + '☆'.repeat(5 - number);
    }
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
          region={this.props.region}
          showsUserLocation
          onRegionChange={region => {
            this.props.dispatch(HMapActions.setRegion(region));
          }}
        >
          {this.props.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.latlng}
              description="See Description &rarr;"
              title={drawStars(marker.rating)}
              pinColor={getPinColor(marker.rating)}
              onCalloutPress={() => this.props.navigation.navigate('spotDetails', { spotId: marker.id, latlng: marker.latlng })}
            />
          ))}
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
