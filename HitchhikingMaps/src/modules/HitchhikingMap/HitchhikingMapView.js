import React, {PropTypes} from 'react';
import {Content, Container, Header, Button} from 'native-base';
import { withNavigation } from '@exponent/ex-navigation';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as HitchhikingMapState from './HitchhikingMapState';

@withNavigation
class HitchhikingMapView extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  // TODO I don't like this
  _goToAbout = () => {
    this.props.navigator.push('settings', {name: 'Brent'});
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
          <Button onPress={this._goToAbout}>
            SEE POINT DETAILS
          </Button>
        </Content>
      </Container>
    );
  }
}

export default HitchhikingMapView;
