import React, { PropTypes } from 'react';
import { Card, CardItem, Text } from 'native-base';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as Actions from './SpotDetailsState';

class SpotDetailsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Spot',
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchSpotDetails(this.props.route.params.id))
      .then(() => {
        this.props.navigator.updateCurrentRouteParams({
          title: this.props.title,
        });
      });
  }

  render() {
    return (
      <Button>Exmaple</Button>
    );
  }
}

export default SpotDetailsView;
