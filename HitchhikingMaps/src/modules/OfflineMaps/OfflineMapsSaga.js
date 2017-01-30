import { call, cps, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_OFFLINE_MAPS_REQUEST, FETCH_OFFLINE_MAPS_SUCCESS, FETCH_OFFLINE_MAPS_FAILURE
} from './OfflineMapsState';
import Mapbox from '../../services/Mapbox';
import ApiRequest from '../../services/Api';

/**
 * Saga which fetches all offline maps
 * @param {[type]} action        action.payload is a { bounds, zoomLevel } object
 * @yield {[type]} [description]
 */
function* fetchOfflineMapSaga() {
  try {
    const packs = yield call(Mapbox.getOfflinePacks);
    yield put({ type: FETCH_OFFLINE_MAPS_SUCCESS, payload: packs });
  } catch (error) {
    yield put({ type: FETCH_OFFLINE_MAPS_FAILURE, error });
  }
}

export default function* OfflineMapsSaga() {
  yield takeLatest(FETCH_OFFLINE_MAPS_REQUEST, fetchOfflineMapSaga);
}
