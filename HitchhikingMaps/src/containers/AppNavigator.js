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
    }
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
