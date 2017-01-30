import { createRouter } from '@exponent/ex-navigation';
import SettingsView from './Settings/SettingsView';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import SpotDetailsViewContainer from './SpotDetails/SpotDetailsViewContainer';
import OfflineMapsViewContainer from './OfflineMaps/OfflineMapsViewContainer';
import TabBar from '../components/TabBar/TabBar';

export default Router = createRouter(() => ({
  tabBar: () => TabBar,
  hitchhikingMap: () => HitchhikingMapViewContainer,
  spotDetails: () => SpotDetailsViewContainer,
  settings: () => SettingsView,
  offlineMaps: () => OfflineMapsViewContainer
}));
