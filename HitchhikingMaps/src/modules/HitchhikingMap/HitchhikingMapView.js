import React, {PropTypes} from 'react';
import {Content, Container, Header, Button} from 'native-base';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as HitchhikingMapState from './HitchhikingMapState';

const HitchhikingMapView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  render() {
    const text = 'This is not a map.';
    return (
      <Container>
        <Content>
          <Button onPress={() => this.props.dispatch(HitchhikingMapState.fetchCountries())}>
            GET COUNTRIES
          </Button>
          <Button onPress={() => this.props.dispatch(HitchhikingMapState.fetchPoints())}>
            GET POINTS
          </Button>
        </Content>
      </Container>
    );
  }
});

export default HitchhikingMapView;
