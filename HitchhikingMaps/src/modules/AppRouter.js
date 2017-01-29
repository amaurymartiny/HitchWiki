import { createRouter } from '@exponent/ex-navigation';
import SettingsViewContainer from './Settings/SettingsViewContainer';
import HitchhikingMapViewContainer from './HitchhikingMap/HitchhikingMapViewContainer';
import SpotDetailsViewContainer from './SpotDetails/SpotDetailsViewContainer';
import TabBar from '../components/TabBar/TabBar';

export default Router = createRouter(() => ({
  tabBar: () => TabBar,
  hitchhikingMap: () => HitchhikingMapViewContainer,
  spotDetails: () => SpotDetailsViewContainer,
  settings: () => SettingsViewContainer,
}));
