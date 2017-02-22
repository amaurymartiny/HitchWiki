import { fork } from 'redux-saga/effects';
// import HitchhikingMapSaga from '../containers/HitchhikingMap/HitchhikingMapSaga';
import { HitchhikingMapSagas } from '../ducks/HitchhikingMap';
import { SpotDetailsSagas } from '../ducks/SpotDetails';
import { SnapshotsSagas } from '../ducks/Snapshots';

import OfflineSpotsSaga from '../containers/OfflineSpots/OfflineSpotsSaga';

export default function* rootSaga() {
  yield [
    fork(HitchhikingMapSagas),
    fork(SpotDetailsSagas),
    fork(SnapshotsSagas),
    fork(OfflineSpotsSaga)
  ];
}
