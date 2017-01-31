import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

class SettingsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Settings',
    },
  }

  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  // }

  goToOfflineMaps = () => {
    this.props.navigator.push('offlineMaps');
  }

  render() {
    return (
      <View>
        <ListItem
          title="Offline Maps"
          leftIcon={{ type: 'ionicon', name: 'ios-cloud-download' }}
          onPress={this.goToOfflineMaps}
        />
      </View>
    );
  }
}

export default SettingsView;
