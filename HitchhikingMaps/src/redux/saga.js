import { fork } from 'redux-saga/effects';
import SpotDetailsSaga from '../modules/SpotDetails/SpotDetailsSaga';
import HitchhikingMapSaga from '../modules/HitchhikingMap/HitchhikingMapSaga';

export default function* rootSaga() {
  yield [
    fork(HitchhikingMapSaga),
    fork(SpotDetailsSaga),
  ];
}
