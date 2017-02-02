import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

import { fetchOfflineSpots } from './OfflineSpotsState';
import theme from '../../services/ThemeService';

class OfflineSpotsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Offline Spots',
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchOfflineSpots());
  }

  render() {
    console.log(this.props)
    return (
      <View>
        {this.props.spots.map((spot, index) => (
          <ListItem
            key={index}
            title={`Spot #${index + 1}`}
            leftIcon={{ type: 'ionicon', name: 'ios-pin' }}
            onPress={() => this.props.navigator.push('spotDetails', { spotId: spot })}
          />
        ))}
      </View>
    );
  }
}

export default OfflineSpotsView;
