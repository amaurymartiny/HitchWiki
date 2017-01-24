import React, {PropTypes} from 'react';
import {Content, Container, Header, Button} from 'native-base';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as HitchhikingMapState from './HitchhikingMapState';

class HitchhikingMapView extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
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
}

export default HitchhikingMapView;
