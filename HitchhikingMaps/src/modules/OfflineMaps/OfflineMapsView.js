import React, { PropTypes } from 'react';
import { Text } from 'react-native-elements';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
class OfflineMapsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Offline Maps',
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Text>Settings</Text>
    );
  }
}

export default OfflineMapsView;
