import { AsyncStorage } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';

import types from './types';
import { MessageBarActions } from '../MessageBar';

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
 * @param {[type]} action        action.payload is the uri
 * @yield {[type]} [description]
 */
function* saveSnapshotRequestSaga(action) {
  yield put(MessageBarActions.setMessage('Saving snapshot...', false));
}

/**
 * Saga which saves a snapshot
 * @param {[type]} action        action.payload is the uri
 * @yield {[type]} [description]
 */
function* saveSnapshotSuccessSaga(action) {
  yield put(MessageBarActions.setMessage('Snapshot saved successfully.'));
}

export default function* SnapshotsSaga() {
  yield [
    takeLatest(types.FETCH_SNAPSHOTS_REQUEST, fetchSnapshotsSaga),
    takeLatest(types.SAVE_SNAPSHOT_REQUEST, saveSnapshotRequestSaga),
    takeLatest(types.SAVE_SNAPSHOT_SUCCESS, saveSnapshotSuccessSaga),
  ];
}
