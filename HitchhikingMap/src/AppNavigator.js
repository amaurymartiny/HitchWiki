import React from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HMapViewContainer from './containers/HMap/HMapViewContainer';
import SpotDetailsViewContainer from './containers/SpotDetails/SpotDetailsViewContainer';
import SettingsViewContainer from './containers/Settings/SettingsViewContainer';
import SnapshotsViewContainer from './containers/Snapshots/SnapshotsViewContainer';
import OfflineSpotsViewContainer from './containers/OfflineSpots/OfflineSpotsViewContainer';
import AboutPage from './components/AboutPage/AboutPage';
import OnboardingPage from './components/OnboardingPage/OnboardingPage';

const HMapNavigator = StackNavigator({
  hMap: { screen: HMapViewContainer },
  onboarding: { screen: OnboardingPage },
  spotDetails: { screen: SpotDetailsViewContainer },
}, {
  // headerMode: 'none',
  headerMode: 'screen',
  navigationOptions: {
    tabBar: {
      label: 'Map',
      icon: ({ tintColor }) => ( // eslint-disable-line react/prop-types
        <Icon type="ionicon" name="ios-map" color={tintColor} />
      ),
      visible: true,
    },
  },
});

const SettingsNavigator = StackNavigator({
  settings: { screen: SettingsViewContainer },
  snapshots: { screen: SnapshotsViewContainer },
  offlineSpots: { screen: OfflineSpotsViewContainer },
  spotDetailsSettings: { screen: SpotDetailsViewContainer },
  about: { screen: AboutPage },
  onboarding: { screen: OnboardingPage },
}, {
  navigationOptions: {
    tabBar: {
      label: 'Settings',
      icon: ({ tintColor }) => ( // eslint-disable-line react/prop-types
        <Icon type="ionicon" name="ios-settings" color={tintColor} />
      ),
      visible: true,
    },
  },
});

const AppNavigator = TabNavigator({
  hMap: { screen: HMapNavigator },
  settings: { screen: SettingsNavigator },
}, {
  navigationOptions: {
  },
});

export default AppNavigator;
