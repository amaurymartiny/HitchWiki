import React, { PropTypes } from 'react';
import { Card, Button, Text } from 'react-native-elements';
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
    this.props.navigator.push('spotDetails', { id: 22203 });
  }

  render() {
    return (
      <Card>
        <Button
          onPress={() => this.props.dispatch(Actions.fetchCountries())}
          title="GET COUNTRIES"
        />
        <Button 
          onPress={() => this.props.dispatch(Actions.fetchPoints())}
          title="GET POINTS"
        />
        <Button
          onPress={this._goToSpotDetails}
          title="SEE POINT DETAILS"
        />
      </Card>
    );
  }
}

export default HitchhikingMapView;
