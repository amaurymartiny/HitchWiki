import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_SPOT_DETAILS_REQUEST, FETCH_SPOT_DETAILS_SUCCESS, FETCH_SPOT_DETAILS_FAILURE } from './SpotDetailsState';
import apiRequest from '../../services/api';

function* fetchSpotDetailsSaga(action) {
  try {
    const response = yield call(apiRequest, `action=hwspotidapi&page_id=${action.spotId}&format=json&properties=Cities%2CCountry%2CCardinalDirection&user_id=0`);
    yield put({ type: FETCH_SPOT_DETAILS_SUCCESS, payload: response.spot });
  } catch (error) {
    yield put({ type: FETCH_SPOT_DETAILS_FAILURE, error });
  }
}

export default function* SpotDetailsSaga() {
  yield takeLatest(FETCH_SPOT_DETAILS_REQUEST, fetchSpotDetailsSaga);
}
