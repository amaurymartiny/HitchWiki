import React, {PropTypes} from 'react';
import {Content, Container, Header, Title, Button} from 'native-base';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';

import * as Actions from './SpotDetailsState';

class SpotDetailsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Spot'
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchSpotDetails(this.props.route.params.id));
  }

  render() {
    return (
      <Button>Exmaple</Button>
    );
  }
}

export default SpotDetailsView;
