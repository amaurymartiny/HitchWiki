import { call, put, takeLatest } from 'redux-saga/effects';

import types from './types';
import actions from './actions';
import ApiService from '../../services/ApiService';

/**
 * Saga that fetches a Spot's details from the API
 * @param {[type]} action        action.payload is the spotId
 * @yield {[type]} [description]
 */
function* fetchSpotDetailsRequestSaga(action) {
  try {
    const response = yield call(ApiService, `action=hwspotidapi&page_id=${action.payload}&format=json&properties=Cities%2CCountry%2CCardinalDirection&user_id=0`);
    yield put(actions.fetchSpotDetailsSuccess(response.spot));
  } catch (error) {
    yield put(actions.fetchSpotDetailsFailure(error));
  }
}

export default function* SpotDetailsSaga() {
  yield takeLatest(types.FETCH_SPOT_DETAILS_REQUEST, fetchSpotDetailsRequestSaga);
}
