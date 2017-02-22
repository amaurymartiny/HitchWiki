import { fork } from 'redux-saga/effects';
// import HitchhikingMapSaga from '../containers/HitchhikingMap/HitchhikingMapSaga';
import { HitchhikingMapSagas } from '../ducks/HitchhikingMap';
import SpotDetailsSaga from '../containers/SpotDetails/SpotDetailsSaga';
import OfflineMapsSaga from '../containers/OfflineMaps/OfflineMapsSaga';
import OfflineSpotsSaga from '../containers/OfflineSpots/OfflineSpotsSaga';

export default function* rootSaga() {
  yield [
    fork(HitchhikingMapSagas),
    fork(SpotDetailsSaga),
    fork(OfflineMapsSaga),
    fork(OfflineSpotsSaga)
  ];
}
