import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import theme from '../../services/ThemeService';

class SettingsView extends React.Component {

  static navigationOptions = {
    title: 'Settings',
  }

  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
    offlineSpotsCount: React.PropTypes.number.isRequired,
    snapshotsCount: React.PropTypes.number.isRequired,
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <View style={styles.background}>
          <ListItem
            title="Snapshots"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-camera', color: theme.darkGrey }}
            badge={{ value: this.props.snapshotsCount }}
            onPress={() => this.props.navigation.navigate('snapshots')}
          />
          <ListItem
            title="Offline Spots"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-bookmarks', color: theme.darkGrey }}
            badge={{ value: this.props.offlineSpotsCount }}
            onPress={() => this.props.navigation.navigate('offlineSpots')}
          />
          {/* <ListItem
            title="Offline Maps"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-cloud-download', color: theme.darkGrey }}
            hideChevron
            badge={{ value: 'Coming Soon!', badgeContainerStyle: { backgroundColor: theme.red } }}
            onPress={() => this.props.navigation.navigate('offlineMaps')}
          />*/}
          <ListItem
            title="Tutorial"
            titleStyle={theme.styles.textColor}
            leftIcon={{ type: 'ionicon', name: 'ios-game-controller-a', color: theme.darkGrey }}
            onPress={() => this.props.navigation.navigate('onboarding')}
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
    backgroundColor: 'white',
  },
});

export default SettingsView;
