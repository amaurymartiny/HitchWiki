import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as Actions from './SpotDetailsState';

class SpotDetailsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Spot Details',
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchSpotDetails(this.props.route.params.id))
  }

  render() {
    return (
      <Card
        title='DESCRIPTION'>
        <Text>
          {this.props.Description}
        </Text>
      </Card>
    );
  }
}

export default SpotDetailsView;
