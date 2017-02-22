import { call, cps, put, takeLatest } from 'redux-saga/effects';

import types from './types';
import actions from './actions';
import ApiService from '../../services/ApiService';

/**
 * Saga which fetches the spots inside bounds from HitchWiki API 
 * @param {[type]} action        action.payload is a [ SWLat, SWLon, NELat, NELon ] array
 * @yield {[type]} [description]
 */
function* fetchSpotsSaga(action) {
  try {
    const response = yield call(ApiService, `action=hwmapapi&format=json&SWlat=${action.payload.bounds[0]}&SWlon=${action.payload.bounds[1]}&NElat=${action.payload.bounds[2]}&NElon=${action.payload.bounds[3]}`);
    yield put({ type: types.FETCH_SPOTS_SUCCESS, payload: response.spots });
  } catch (error) {
    yield put({ type: types.FETCH_SPOTS_FAILURE, error });
  }
}

/**
 * Saga which get the current GPS location
 * @param {[type]} action        action.payload is a <MapView /> to setCoordinates on
 * @yield {[type]} [description]
 */
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
    yield;
    const position = yield cps(getCurrentPosition);
    // create a new region to zoom into
    const newRegion = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5
    };
    yield put({ type: types.SET_REGION, payload: newRegion});
    yield put({ type: types.GET_LOCATION_SUCCESS });
  } catch(error) {
    yield put({ type: types.GET_LOCATION_FAILURE, error });
  }
}

export default function* HitchhikingMapSaga() {
  yield [
    takeLatest(types.FETCH_SPOTS_REQUEST, fetchSpotsSaga),
    takeLatest(types.GET_LOCATION_REQUEST, getLocationSaga)
  ];
}
