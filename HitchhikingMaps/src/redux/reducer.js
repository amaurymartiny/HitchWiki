import { combineReducers } from 'redux';
import HitchhikingMapStateReducer from '../modules/HitchhikingMap/HitchhikingMapState';
import SpotDetailsStateReducer from '../modules/SpotDetails/SpotDetailsState';
import SessionStateReducer, { RESET_STATE } from '../modules/Session/SessionState';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapStateReducer,
  spotDetails: SpotDetailsStateReducer,

  session: SessionStateReducer,
});

export default rootReducer;