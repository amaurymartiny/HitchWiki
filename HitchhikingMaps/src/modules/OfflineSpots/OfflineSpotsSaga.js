import { AsyncStorage } from 'react-native';
import { call, cps, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_OFFLINE_SPOT_REQUEST, FETCH_OFFLINE_SPOT_SUCCESS, FETCH_OFFLINE_SPOT_FAILURE,
  DELETE_OFFLINE_SPOT_REQUEST, DELETE_OFFLINE_SPOT_SUCCESS, DELETE_OFFLINE_SPOT_FAILURE,
  SAVE_OFFLINE_SPOT_REQUEST, SAVE_OFFLINE_SPOT_SUCCESS, SAVE_OFFLINE_SPOT_FAILURE
} from './OfflineSpotsState';

/**
 * Saga which fetch a specific offline spot in AsyncStorage
 * @param {object} action action.payload is spotId
 * @yield {[type]} [description]
 */
function* fetchOfflineSpotSaga(action) {
  try {
    const spotObject = yield call(AsyncStorage.getItem, `@SPOT:${action.payload}`);
    yield put({ type: FETCH_OFFLINE_SPOT_SUCCESS, payload: JSON.parse(spotObject) });
  } catch (error) {
    yield put({ type: FETCH_OFFLINE_SPOT_FAILURE, error });
  }
}

/**
 * Saga which saves offline a spot
 * @param {[type]} action        action.payload is a { spotId, spotObject } object
 * @yield {[type]} [description]
 */
function* saveOfflineSpotsaga(action) {
  const packName = `@Pack:${new Date().getTime()}`; // name of the pack to save = now's timestamp
  try {
    yield call(AsyncStorage.setItem, `@SPOT:${action.payload.spotId}`, JSON.stringify(action.payload.spotObject));
    yield put({ type: SAVE_OFFLINE_SPOT_SUCCESS, payload: action.payload.spotObject });
  } catch (error) {
    yield put({ type: SAVE_OFFLINE_SPOT_FAILURE, error });
  }
}

/**
 * Saga to delete an offline spot
 * @param {[type]} action        action.payload is spotId
 * @yield {[type]} [description]
 */
function* deleteOfflineSpotsaga(action) {
  try {
    const info = yield call(AsyncStorage.removeItem, `@SPOT:${action.payload}`);
    yield put({ type: DELETE_OFFLINE_SPOT_SUCCESS });
  } catch (error) {
    yield put({ type: DELETE_OFFLINE_SPOT_FAILURE, error });
  }
}

export default function* OfflineSpotsSaga() {
  yield [
    takeLatest(FETCH_OFFLINE_SPOT_REQUEST, fetchOfflineSpotSaga),
    takeLatest(SAVE_OFFLINE_SPOT_REQUEST, saveOfflineSpotsaga),
    takeLatest(DELETE_OFFLINE_SPOT_REQUEST, deleteOfflineSpotsaga),
  ];
}
