import { fork } from 'redux-saga/effects';
import HitchhikingMapSaga from '../modules/HitchhikingMap/HitchhikingMapSaga';
import SpotDetailsSaga from '../modules/SpotDetails/SpotDetailsSaga';
import OfflineMapsSaga from '../modules/OfflineMaps/OfflineMapsSaga';
import OfflineSpotsSaga from '../modules/OfflineSpots/OfflineSpotsSaga';

export default function* rootSaga() {
  yield [
    fork(HitchhikingMapSaga),
    fork(SpotDetailsSaga),
    fork(OfflineMapsSaga),
    fork(OfflineSpotsSaga)
  ];
}
