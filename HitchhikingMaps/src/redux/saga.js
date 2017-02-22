import { fork } from 'redux-saga/effects';
// import HitchhikingMapSaga from '../containers/HitchhikingMap/HitchhikingMapSaga';
import { HitchhikingMapSagas } from '../ducks/HitchhikingMap';
import { SpotDetailsSagas } from '../ducks/SpotDetails';
import OfflineMapsSaga from '../containers/OfflineMaps/OfflineMapsSaga';
import OfflineSpotsSaga from '../containers/OfflineSpots/OfflineSpotsSaga';

export default function* rootSaga() {
  yield [
    fork(HitchhikingMapSagas),
    fork(SpotDetailsSagas),
    fork(OfflineMapsSaga),
    fork(OfflineSpotsSaga)
  ];
}
