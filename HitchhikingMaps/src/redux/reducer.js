import { combineReducers } from 'redux';
import HitchhikingMapReducer from '../ducks/HitchhikingMap';
import SpotDetailsReducer from '../ducks/SpotDetails';
import OfflineMapsStateReducer from '../containers/OfflineMaps/OfflineMapsState';
import OfflineSpotsStateReducer from '../containers/OfflineSpots/OfflineSpotsState';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapReducer,
  spotDetails: SpotDetailsReducer,
  offlineMaps: OfflineMapsStateReducer,
  offlineSpots: OfflineSpotsStateReducer,
});

export default rootReducer;
