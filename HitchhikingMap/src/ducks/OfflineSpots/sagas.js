import { put, takeLatest } from 'redux-saga/effects';

import types from './types';
import actions from './actions';
import { MessageBarActions } from '../MessageBar';
import GoogleStaticMapService from '../../services/GoogleStaticMapService';

/**
 * Saga which displays a message when we save a spot
 * @param {Object} action        action.payload is a { id, spot } object
 * @yield {}                     dispatch setMessage
 */
function* saveOfflineSpotSaga(action) {
  yield put(MessageBarActions.setMessage('Saving spot offline...', false));
  yield put(actions.saveStaticMapRequest(action.payload.latlng))
}

/**
 * Saga which saves a static Google Map
 * @param {Object} action        action.payload is a latlng object
 * @yield {}                     dispatch setMessage
 */
function* saveStaticMapRequestSaga(action) {
  GoogleStaticMapService(action.payload);
}

/**
 * Saga which displays a message when we successfully saved a spot
 * @param {Object} action        action.payload is a { id, spot } object
 * @yield {}                     dispatch setMessage
 */
function* saveStaticMapSuccessSaga(action) {
  yield put(MessageBarActions.setMessage('Spot saved successfully.'));
}

export default function* OfflineSpotsSaga() {
  yield [
    takeLatest(types.SAVE_STATIC_MAP_REQUEST, saveStaticMapRequestSaga),
    takeLatest(types.SAVE_STATIC_MAP_SUCCESS, saveStaticMapSuccessSaga),
    takeLatest(types.SAVE_OFFLINE_SPOT, saveOfflineSpotSaga),
  ];
}
