import { fork } from 'redux-saga/effects';

import { HMapSagas } from '../ducks/HMap';
import { SpotDetailsSagas } from '../ducks/SpotDetails';
import { SnapshotsSagas } from '../ducks/Snapshots';
import { OfflineSpotsSagas } from '../ducks/OfflineSpots';

export default function* rootSaga() {
  yield [
    fork(HMapSagas),
    fork(SpotDetailsSagas),
    fork(SnapshotsSagas),
    fork(OfflineSpotsSagas),
  ];
}
