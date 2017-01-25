import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { Title, Subtitle, Screen } from '@shoutem/ui';
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
      <Screen>
        <Title>{this.props.Cities.length ? this.props.Cities[this.props.Cities.length - 1] : this.props.title}</Title>
        <Subtitle>{this.props.Country.length && this.props.Country[0]}</Subtitle>
      </Screen>
    );
  }
}

export default SpotDetailsView;
