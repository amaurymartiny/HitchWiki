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

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View>
        <ListItem
          title="Offline Maps"
          titleStyle={theme.styles.textColor}
          leftIcon={{ type: 'ionicon', name: 'ios-cloud-download', color: theme.darkGrey }}
          onPress={() => this.props.navigator.push('offlineMaps')}
        />
        <ListItem
          title="Offline Spots"
          titleStyle={theme.styles.textColor}
          leftIcon={{ type: 'ionicon', name: 'ios-bookmarks', color: theme.darkGrey }}
          onPress={() => this.props.navigator.push('offlineSpots')}
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
