import { call, put, takeLatest } from 'redux-saga/effects';

import types from './types';
import ApiService from '../../services/ApiService';

function* fetchSpotDetailsSaga(action) {
  try {
    const response = yield call(ApiService, `action=hwspotidapi&page_id=${action.spotId}&format=json&properties=Cities%2CCountry%2CCardinalDirection&user_id=0`);
    yield put({ type: types.FETCH_SPOT_DETAILS_SUCCESS, payload: response.spot });
  } catch (error) {
    yield put({ type: types.FETCH_SPOT_DETAILS_FAILURE, error });
  }
}

export default function* SpotDetailsSaga() {
  yield takeLatest(types.FETCH_SPOT_DETAILS_REQUEST, fetchSpotDetailsSaga);
}
