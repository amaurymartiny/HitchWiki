import { combineReducers } from 'redux';
import HitchhikingMapStateReducer from '../modules/HitchhikingMap/HitchhikingMapState';
import SpotDetailsStateReducer from '../modules/SpotDetails/SpotDetailsState';
import OfflineMapsStateReducer from '../modules/OfflineMaps/OfflineMapsState';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapStateReducer,
  spotDetails: SpotDetailsStateReducer,
  offlineMaps: OfflineMapsStateReducer
});

export default rootReducer;
