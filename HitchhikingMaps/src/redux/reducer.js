import { combineReducers } from 'redux';
import HitchhikingMapReducer from '../ducks/HitchhikingMap';
import SpotDetailsReducer from '../ducks/SpotDetails';
import SnapshotsReducer from '../ducks/Snapshots';
import OfflineSpotsReducer from '../ducks/OfflineSpots';

const rootReducer = combineReducers({
  hitchhikingMap: HitchhikingMapReducer,
  spotDetails: SpotDetailsReducer,
  snapshots: SnapshotsReducer,
  offlineSpots: OfflineSpotsReducer,
});

export default rootReducer;
