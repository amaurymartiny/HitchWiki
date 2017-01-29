import { call, cps, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_SPOTS_REQUEST, FETCH_SPOTS_SUCCESS, FETCH_SPOTS_FAILURE,
  GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_FAILURE
} from './HitchhikingMapState';
import apiRequest from '../../services/api';

function* fetchSpotsSaga(action) {
  try {
    const response = yield call(apiRequest, `action=hwmapapi&format=json&SWlat=${action.payload.bounds[0]}&SWlon=${action.payload.bounds[1]}&NElat=${action.payload.bounds[2]}&NElon=${action.payload.bounds[3]}`);
    yield put({ type: FETCH_SPOTS_SUCCESS, payload: response.spots });
  } catch (error) {
    yield put({ type: FETCH_SPOTS_FAILURE, error });
  }
}

function* getLocationSaga(action) {

  // geolocation.getCurrentPosition's footprint is (dataCallback, errorCallback, options)
  // cps needs a function whose footprint is (err, data) => ...
  // this function makes the change
  function getCurrentPosition(callback) {
    return navigator.geolocation.getCurrentPosition(
      position => { return callback(null, position); },
      error => { return callback(error, null); },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  
  try {
    const position = yield cps(getCurrentPosition);
    // TODO not sure if to put here
    // action.payload here is a reference to the <MapView />
    // used to called setCoordinates in saga side effect
    action.payload.setCenterCoordinate(position.coords.latitude, position.coords.longitude);
    yield put({ type: GET_LOCATION_SUCCESS, payload: position });
  } catch(error) {
    yield put({ type: GET_LOCATION_FAILURE, error });
  }
}

export default function* HitchhikingMapSaga() {
  yield [
    takeLatest(FETCH_SPOTS_REQUEST, fetchSpotsSaga),
    takeLatest(GET_LOCATION_REQUEST, getLocationSaga)
  ];
}
