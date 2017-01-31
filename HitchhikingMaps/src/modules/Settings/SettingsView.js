import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

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
      <View style={{backgroundColor: '#EEF0F3'}}>
        <List>
          <ListItem
            title="Offline Maps"
            leftIcon={{ type: 'ionicon', name: 'ios-cloud-download' }}
            onPress={this.goToOfflineMaps}
          />
        </List>
      </View>
    );
  }
}

export default SettingsView;
