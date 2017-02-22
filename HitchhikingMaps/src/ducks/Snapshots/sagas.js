import { AsyncStorage } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';

import types from './types';

/**
 * Saga which fetch all snapshots'
 * @yield {[type]} [description]
 */
function* fetchSnapshotsSaga() {
  try {
    const snapshots = yield call(AsyncStorage.getItem, '@SNAPSHOTS');
    yield put({ type: types.FETCH_SNAPSHOTS_SUCCESS, payload: JSON.parse(snapshots) || [] }); // defaults to [] is snapshots is null
  } catch (error) {
    yield put({ type: types.FETCH_SNAPSHOTS_FAILURE, error });
  }
}

/**
 * Saga which saves a snapshot
 * @param {[type]} action        action.payload is the reference to the MapView object
 * @yield {[type]} [description]
 */
function* saveSnapshotSaga(action) {
  try {
    // Get array of all snapshots to add new one
    let snapshots = yield call(AsyncStorage.getItem, '@SNAPSHOTS');
    snapshots = JSON.parse(snapshots) || [];
    console.log(action.payload.takeSnapshot)
    const snapshotUri = yield call([action.payload, action.payload.takeSnapshot], {
      format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file'   // result types: 'file', 'base64' (default: 'file')
    });
    snapshots.push(snapshotUri);
    yield call(AsyncStorage.setItem, '@SNAPSHOTS', JSON.stringify(snapshots));
    yield put({ type: types.SAVE_SNAPSHOT_SUCCESS });
  } catch (error) {
    yield put({ type: types.SAVE_SNAPSHOT_FAILURE, error });
  }
}

export default function* SnapshotsSaga() {
  yield [
    takeLatest(types.FETCH_SNAPSHOTS_REQUEST, fetchSnapshotsSaga),
    takeLatest(types.SAVE_SNAPSHOT_REQUEST, saveSnapshotSaga),
  ];
}
