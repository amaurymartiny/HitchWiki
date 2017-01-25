import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { Tile, Heading, Subtitle, Screen } from '@shoutem/ui';
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
      <Tile styleName="xl-gutter">

        <Heading>{this.props.Cities.length ? this.props.Cities[this.props.Cities.length - 1] : this.props.title}</Heading>
        <Subtitle>
          {this.props.Cities.slice(0, -1).map((city) => {
            return city + ', ';
          })}
          {this.props.Country.length && this.props.Country[0]}
        </Subtitle>
      </Tile>
      </Screen>
    );
  }
}

export default SpotDetailsView;
