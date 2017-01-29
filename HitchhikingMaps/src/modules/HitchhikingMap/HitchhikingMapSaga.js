import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_SPOTS_REQUEST, FETCH_SPOTS_SUCCESS, FETCH_SPOTS_FAILURE } from './HitchhikingMapState';
import apiRequest from '../../services/api';

function* fetchSpotsSaga(action) {
  try {
    const response = yield call(apiRequest, `action=hwmapapi&format=json&NElat=${action.bounds[0]}&NElon=${action.bounds[1]}&SWlat=${action.bounds[2]}&SWlon=${action.bounds[3]}`);
    yield put({ type: FETCH_SPOTS_SUCCESS, payload: response.spots });
  } catch (error) {
    yield put({ type: FETCH_SPOTS_FAILURE, error });
  }
}

export default function* HitchhikingMapSaga() {
  yield takeLatest(FETCH_SPOTS_REQUEST, fetchSpotsSaga);
}
