import { AsyncStorage } from 'react-native';
import { put, takeLatest } from 'redux-saga/effects';

import types from './types';
import actions from './actions';
import { MessageBarActions } from '../MessageBar';

/**
 * Saga which saves a snapshot and prints a message
 * @param {[type]} action        action.payload is snapshot Promise
 * @yield {[type]} [description]
 */
function* saveSnapshotRequestSaga(action) {
  try {
    // yield put(MessageBarActions.setMessage('Saving snapshot...', false));
    const uri = yield action.payload;
    yield put(actions.saveSnapshotSuccess(uri));
  } catch (error) {
    yield put(actions.saveSnapshotFailure(error));
  }
}

/**
 * Saga which shows a message when snapshot is saved
 * @param {[type]} action        action.payload is snapshot Promise
 * @yield {[type]} [description]
 */
function* saveSnapshotSuccessSaga(action) {
  yield put(MessageBarActions.setMessage('Snapshot saved successfully.'));
}

export default function* SnapshotsSaga() {
  yield [
    takeLatest(types.SAVE_SNAPSHOT_REQUEST, saveSnapshotRequestSaga),
    takeLatest(types.SAVE_SNAPSHOT_SUCCESS, saveSnapshotSuccessSaga),
  ];
}
