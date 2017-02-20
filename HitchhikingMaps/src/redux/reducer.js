import { combineReducers } from 'redux';
import HitchhikingMapStateReducer from '../modules/HitchhikingMap/HitchhikingMapState';
import SpotDetailsStateReducer from '../modules/SpotDetails/SpotDetailsState';
import OfflineMapsStateReducer from '../modules/OfflineMaps/OfflineMapsState';
import OfflineSpotsStateReducer from '../modules/OfflineSpots/OfflineSpotsState';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapStateReducer,
  spotDetails: SpotDetailsStateReducer,
  offlineMaps: OfflineMapsStateReducer,
  offlineSpots: OfflineSpotsStateReducer,
});

export default rootReducer;
