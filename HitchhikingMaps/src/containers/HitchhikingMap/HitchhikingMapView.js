import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';

import { HitchhikingMapActions } from '../../ducks/HitchhikingMap';
import { SnapshotsActions } from '../../ducks/Snapshots';

import Background from '../../components/Background/Background';
import theme from '../../services/ThemeService';

class HitchhikingMapView extends React.Component {

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
    this.props.dispatch(HitchhikingMapActions.getLocation(this.refs.map));
  }

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

    // Mapstyle from https://mapstyle.withgoogle.com/
    const mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ];
    return (
      <View style={styles.fullScreen}>
        <MapView
          ref="map"
          style={styles.fullScreen}
          region={this.props.region}
          showsUserLocation
          customMapStyle={mapStyle}
          onRegionChange={region => this.props.dispatch(HitchhikingMapActions.setRegion(region))}
          onRegionChangeComplete={region => {
            if (region.latitudeDelta > 0.7 || region.longitudeDelta > 0.7) return;
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
        <ActionButton
          position="left"
          buttonColor={theme.red}
          icon={<Icon type="ionicon" name="ios-camera" color="white" />}
        >
          {/*<ActionButton.Item
            buttonColor={theme.red}
            title="Download Offline Map"
          >
            <Icon type="ionicon" name="ios-cloud-download" color="white" />
          </ActionButton.Item>*/}
          <ActionButton.Item
            buttonColor={theme.red}
            title="Take Snapshot"
            onPress={() => this.props.dispatch(SnapshotsActions.saveSnapshot(this.refs.map))}
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
          onPress={() => this.props.dispatch(HitchhikingMapActions.getLocation(this.refs.map))}
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

export default HitchhikingMapView;
