import { put, takeLatest } from 'redux-saga/effects';

import types from './types';
import actions from './actions';
import { MessageBarActions } from '../MessageBar';
import GoogleStaticMapService from '../../services/GoogleStaticMapService';

/**
 * Saga which saves a offline spot with a Google static maps
 * @param {Object} action        action.payload is a { id, spot, latlng } object
 * @yield {}                     dispatch setMessage
 */
function* saveOfflineSpotRequest(action) {
  const uri = GoogleStaticMapService(action.payload.latlng);
  yield put(actions.saveOfflineSpotSuccess(action.payload.id, action.payload.spot, action.payload.latlng, uri));
  yield put(MessageBarActions.setMessage('Spot saved successfully.'));
}

export default function* OfflineSpotsSaga() {
  yield [
    takeLatest(types.SAVE_OFFLINE_SPOT_REQUEST, saveOfflineSpotRequest),
  ];
}
