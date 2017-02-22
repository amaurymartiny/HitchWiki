import { StackNavigator, TabNavigator } from 'react-navigation';
import SettingsViewContainer from './Settings/SettingsViewContainer';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import SpotDetailsViewContainer from './SpotDetails/SpotDetailsViewContainer';
import OfflineMapsViewContainer from './OfflineMaps/OfflineMapsViewContainer';
import OfflineSpotsViewContainer from './OfflineSpots/OfflineSpotsViewContainer';

const HitchhikingMapNavigator = StackNavigator({
  hitchhikingMap: {
    screen: HitchhikingMapViewContainer
  },
  spotDetails: {
    screen: SpotDetailsViewContainer
  }
});

const SettingsNavigator = StackNavigator({
  settings: {
    screen: SettingsViewContainer
  },
  offlineMaps: {
    screen: OfflineMapsViewContainer
  },
  offlineSpots: {
    screen: OfflineSpotsViewContainer
  },
  spotDetailsSettings: {
    screen: SpotDetailsViewContainer
  }
});

export default AppNavigator = TabNavigator({
  Map: {
    screen: HitchhikingMapNavigator
  },
  Settings: {
    screen: SettingsNavigator
  }
}, {
  navigationOptions: {
    header: {
      visible: false,
    },
 },
});
