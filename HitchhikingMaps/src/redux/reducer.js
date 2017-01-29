import { combineReducers } from 'redux';
import HitchhikingMapStateReducer from '../modules/HitchhikingMap/HitchhikingMapState';
import SpotDetailsStateReducer from '../modules/SpotDetails/SpotDetailsState';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapStateReducer,
  spotDetails: SpotDetailsStateReducer,
});

export default rootReducer;
