import React, { PropTypes } from 'react';
import { Content, Container, Header, Button } from 'native-base';
import { withNavigation } from '@exponent/ex-navigation';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as Actions from './HitchhikingMapState';

@withNavigation
class HitchhikingMapView extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  // TODO I don't like this
  _goToSpotDetails = () => {
    this.props.navigator.push('spotDetails', { id: 22231 });
  }

  render() {
    return (
      <Container>
        <Content>
          <Button onPress={() => this.props.dispatch(Actions.fetchCountries())}>
            GET COUNTRIES
          </Button>
          <Button onPress={() => this.props.dispatch(Actions.fetchPoints())}>
            GET POINTS
          </Button>
          <Button onPress={this._goToSpotDetails}>
            SEE POINT DETAILS
          </Button>
        </Content>
      </Container>
    );
  }
}

export default HitchhikingMapView;
