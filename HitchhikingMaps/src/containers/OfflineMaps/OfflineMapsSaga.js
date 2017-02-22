import { call, cps, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_OFFLINE_MAPS_REQUEST, FETCH_OFFLINE_MAPS_SUCCESS, FETCH_OFFLINE_MAPS_FAILURE,
  DELETE_OFFLINE_MAP_REQUEST, DELETE_OFFLINE_MAP_SUCCESS, DELETE_OFFLINE_MAP_FAILURE,
  SAVE_OFFLINE_MAP_REQUEST, SAVE_OFFLINE_MAP_SUCCESS, SAVE_OFFLINE_MAP_FAILURE
} from './OfflineMapsState';
import ApiRequest from '../../services/ApiService';

/**
 * Saga which fetches all offline maps
 * @yield {[type]} [description]
 */
function* fetchOfflineMapsSaga() {
  try {
    const packs = yield call(Mapbox.getOfflinePacks);
    // get annotations from all packs and concat them into one single array
    let offlineAnnotations = [];
    for (let i = packs.length - 1; i >= 0; i--) {
      offlineAnnotations = offlineAnnotations.concat(packs[i].metadata.annotations);
    }
    yield put({ type: FETCH_OFFLINE_MAPS_SUCCESS, payload: { packs, offlineAnnotations } });
  } catch (error) {
    yield put({ type: FETCH_OFFLINE_MAPS_FAILURE, error });
  }
}

/**
 * Saga which saves offline map
 * @param {[type]} action        action.payload is a { bounds, zoomLevel, annotations } object
 * @yield {[type]} [description]
 */
function* saveOfflineMapSaga(action) {
  const packName = `@Pack:${new Date().getTime()}`; // name of the pack to save = now's timestamp
  try {
    const response = yield call(Mapbox.addOfflinePack, {
      name: packName, // required
      type: 'bbox', // required, only type currently supported
      metadata: { // optional. You can put any information in here that may be useful to you
          date: new Date(),
          annotations: action.payload.annotations
      },
      bounds: action.payload.bounds,
      minZoomLevel: action.payload.zoomLevel, // required
      maxZoomLevel: 15, // required
      styleURL: Mapbox.mapStyles.streets // required. Valid styleURL
    });
    yield put({ type: SAVE_OFFLINE_MAP_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: SAVE_OFFLINE_MAP_FAILURE, error });
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
    yield put({ type: FETCH_OFFLINE_MAPS_REQUEST }); // refetch maps after delete
  } catch (error) {
    yield put({ type: DELETE_OFFLINE_MAP_FAILURE, error });
  }
}

export default function* OfflineMapsSaga() {
  yield [
    takeLatest(FETCH_OFFLINE_MAPS_REQUEST, fetchOfflineMapsSaga),
    takeLatest(SAVE_OFFLINE_MAP_REQUEST, saveOfflineMapSaga),
    takeLatest(DELETE_OFFLINE_MAP_REQUEST, deleteOfflineMapSaga),
  ];
}
