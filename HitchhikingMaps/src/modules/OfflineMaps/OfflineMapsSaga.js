import { call, cps, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_OFFLINE_MAPS_REQUEST, FETCH_OFFLINE_MAPS_SUCCESS, FETCH_OFFLINE_MAPS_FAILURE,
  DELETE_OFFLINE_MAP_REQUEST, DELETE_OFFLINE_MAP_SUCCESS, DELETE_OFFLINE_MAP_FAILURE
} from './OfflineMapsState';
import Mapbox from '../../services/Mapbox';
import ApiRequest from '../../services/Api';

/**
 * Saga which fetches all offline maps
 * @param {[type]} action        action.payload is a { bounds, zoomLevel } object
 * @yield {[type]} [description]
 */
function* fetchOfflineMapsSaga() {
  try {
    const packs = yield call(Mapbox.getOfflinePacks);
    yield put({ type: FETCH_OFFLINE_MAPS_SUCCESS, payload: packs });
  } catch (error) {
    yield put({ type: FETCH_OFFLINE_MAPS_FAILURE, error });
  }
}

/**
 * Saga to delete a specific pack
 * @param {[type]} action        action.payload is the name of the pack
 * @yield {[type]} [description]
 */
function* deleteOfflineMapSaga(action) {
  try {
    const info = yield call(Mapbox.removeOfflinePack, action.payload);
    yield put({ type: DELETE_OFFLINE_MAP_SUCCESS, payload: info });
  } catch (error) {
    yield put({ type: DELETE_OFFLINE_MAP_FAILURE, error });
  }
}

export default function* OfflineMapsSaga() {
  yield [
    takeLatest(FETCH_OFFLINE_MAPS_REQUEST, fetchOfflineMapsSaga),
    takeLatest(DELETE_OFFLINE_MAP_REQUEST, deleteOfflineMapSaga),
  ];
}
