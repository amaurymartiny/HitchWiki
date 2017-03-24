import { put, takeLatest } from 'redux-saga/effects';

import types from './types';
import { MessageBarActions } from '../MessageBar';

/**
 * Saga which displays a message when we save a spot
 * @param {Object} action        action.payload is a { id, spot } object
 * @yield {}                     dispatch setMessage
 */
function* saveOfflineSpotsaga(action) {
  yield put(MessageBarActions.setMessage('Spot saved successfully.'));
}

export default function* OfflineSpotsSaga() {
  yield [
    takeLatest(types.SAVE_OFFLINE_SPOT, saveOfflineSpotsaga),
  ];
}
