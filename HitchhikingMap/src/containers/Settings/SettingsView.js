import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import theme from '../../services/ThemeService';

class SettingsView extends React.Component {

  static navigationOptions = {
    title: 'Settings',
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <View style={styles.background}>
          <ListItem
            title="Snapshots"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-camera', color: theme.darkGrey }}
            onPress={() => this.props.navigation.navigate('snapshots')}
          />
          <ListItem
            title="Offline Spots"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-bookmarks', color: theme.darkGrey }}
            onPress={() => this.props.navigation.navigate('offlineSpots')}
          />
          <ListItem
            title="Offline Maps"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-cloud-download', color: theme.darkGrey }}
            hideChevron={true}
            badge={{ value: 'Coming Soon!', badgeContainerStyle: { backgroundColor: theme.red } }}
            onPress={() => this.props.navigation.navigate('offlineMaps')}
          />
          <ListItem
            title="About"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-information-circle', color: theme.darkGrey }}
            onPress={() => this.props.navigation.navigate('about')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white'
  }
});

export default SettingsView;
