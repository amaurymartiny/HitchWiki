import { combineReducers } from 'redux';
import AppReducer from '../ducks/App';
import HMapReducer from '../ducks/HMap';
import SpotDetailsReducer from '../ducks/SpotDetails';
import SnapshotsReducer from '../ducks/Snapshots';
import OfflineSpotsReducer from '../ducks/OfflineSpots';
import MessageBarReducer from '../ducks/MessageBar';

import RouterReducer from '../ducks/Router'; // should be removed soon, see file

const rootReducer = combineReducers({
  app: AppReducer,
  hMap: HMapReducer,
  spotDetails: SpotDetailsReducer,
  snapshots: SnapshotsReducer,
  offlineSpots: OfflineSpotsReducer,
  messageBar: MessageBarReducer,
  router: RouterReducer,
});

export default rootReducer;
