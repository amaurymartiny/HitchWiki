import { combineReducers } from 'redux';
import HitchhikingMapReducer from '../ducks/HitchhikingMap';
import SpotDetailsReducer from '../ducks/SpotDetails';
import SnapshotsReducer from '../ducks/Snapshots';
import OfflineSpotsStateReducer from '../containers/OfflineSpots/OfflineSpotsState';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapReducer,
  spotDetails: SpotDetailsReducer,
  snapshots: SnapshotsReducer,
  offlineSpots: OfflineSpotsStateReducer,
});

export default rootReducer;
