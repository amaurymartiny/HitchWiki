import React from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HMapViewContainer from './containers/HMap/HMapViewContainer';
import SpotDetailsViewContainer from './containers/SpotDetails/SpotDetailsViewContainer';
import SettingsViewContainer from './containers/Settings/SettingsViewContainer';
import SnapshotsViewContainer from './containers/Snapshots/SnapshotsViewContainer';
import OfflineSpotsViewContainer from './containers/OfflineSpots/OfflineSpotsViewContainer';
// import AboutPage from './components/AboutPage/AboutPage';

const HMapNavigator = StackNavigator({
  HMap: { screen: HMapViewContainer },
  spotDetails: { screen: SpotDetailsViewContainer }
}, {
  navigationOptions: {
    header: {
      visible: false
    },
    tabBar: {
      label: 'Map',
      icon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-map" color={tintColor} />
      ),
      visible: true
    },
  }
});

const SettingsNavigator = StackNavigator({
  settings: { screen: SettingsViewContainer },
  snapshots: { screen: SnapshotsViewContainer },
  offlineSpots: { screen: OfflineSpotsViewContainer },
  spotDetailsSettings: { screen: SpotDetailsViewContainer },
  // about: { screen: AboutPage }
}, {
  navigationOptions: {
    header: {
      visible: true
    },
    tabBar: {
      label: 'Settings',
      icon: ({ tintColor }) => (
        <Icon type="ionicon" name="ios-settings" color={tintColor} />
      ),
      visible: true
    },
  }
});

export default AppNavigator = TabNavigator({
  HMap: { screen: HMapNavigator },
  settings: { screen: SettingsNavigator }
}, {
  navigationOptions: {
    header: {
      visible: false,
    },
 },
});
