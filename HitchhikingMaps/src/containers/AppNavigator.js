import React from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import SpotDetailsViewContainer from './SpotDetails/SpotDetailsViewContainer';
import SettingsViewContainer from './Settings/SettingsViewContainer';
import SnapshotsViewContainer from './Snapshots/SnapshotsViewContainer';
import OfflineSpotsViewContainer from './OfflineSpots/OfflineSpotsViewContainer';

const HitchhikingMapNavigator = StackNavigator({
  hitchhikingMap: { screen: HitchhikingMapViewContainer },
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
  spotDetailsSettings: { screen: SpotDetailsViewContainer }
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
  hitchhikingMap: { screen: HitchhikingMapNavigator },
  settings: { screen: SettingsNavigator }
}, {
  navigationOptions: {
    header: {
      visible: false,
    },
 },
});
