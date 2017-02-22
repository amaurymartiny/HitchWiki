import { combineReducers } from 'redux';
// import HitchhikingMapStateReducer from '../containers/HitchhikingMap/HitchhikingMapState';
import HitchhikingMapReducer from '../ducks/HitchhikingMap';
import SpotDetailsStateReducer from '../containers/SpotDetails/SpotDetailsState';
import OfflineMapsStateReducer from '../containers/OfflineMaps/OfflineMapsState';
import OfflineSpotsStateReducer from '../containers/OfflineSpots/OfflineSpotsState';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapReducer,
  spotDetails: SpotDetailsStateReducer,
  offlineMaps: OfflineMapsStateReducer,
  offlineSpots: OfflineSpotsStateReducer,
});

export default rootReducer;
