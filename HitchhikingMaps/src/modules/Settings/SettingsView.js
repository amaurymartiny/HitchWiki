import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import theme from '../../services/ThemeService';

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
          badge={this.props.offlineMapsCount ? { value: this.props.offlineMapsCount, badgeContainerStyle: styles.badge } : null}
          onPress={this.goToOfflineMaps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.green
  }
});

export default SettingsView;
