import { StackNavigator, TabNavigator } from 'react-navigation';
import SettingsViewContainer from './Settings/SettingsViewContainer';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import SpotDetailsViewContainer from './SpotDetails/SpotDetailsViewContainer';
import OfflineMapsViewContainer from './OfflineMaps/OfflineMapsViewContainer';
import OfflineSpotsViewContainer from './OfflineSpots/OfflineSpotsViewContainer';

const HitchhikingMapNavigator = StackNavigator({
  hitchhikingMap: { screen: HitchhikingMapViewContainer },
  spotDetails: { screen: SpotDetailsViewContainer }
}, {
  navigationOptions: {
    header: {
      visible: false
    }
  }
});

const SettingsNavigator = StackNavigator({
  settings: { screen: SettingsViewContainer },
  offlineMaps: { screen: OfflineMapsViewContainer },
  offlineSpots: { screen: OfflineSpotsViewContainer },
  spotDetailsSettings: { screen: SpotDetailsViewContainer }
}, {
  navigationOptions: {
    header: {
      visible: true
    }
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
