import { call, cps, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_SPOTS_REQUEST, FETCH_SPOTS_SUCCESS, FETCH_SPOTS_FAILURE,
  GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_FAILURE,
  SAVE_OFFLINE_MAP_REQUEST, SAVE_OFFLINE_MAP_SUCCESS, SAVE_OFFLINE_MAP_FAILURE
} from './HitchhikingMapState';
import Mapbox from '../../services/Mapbox';
import ApiRequest from '../../services/Api';

/**
 * Saga which fetches the spots inside bounds from HitchWiki API 
 * @param {[type]} action        action.payload is a [ SWLat, SWLon, NELat, NELon ] array
 * @yield {[type]} [description]
 */
function* fetchSpotsSaga(action) {
  try {
    const response = yield call(ApiRequest, `action=hwmapapi&format=json&SWlat=${action.payload.bounds[0]}&SWlon=${action.payload.bounds[1]}&NElat=${action.payload.bounds[2]}&NElon=${action.payload.bounds[3]}`);
    yield put({ type: FETCH_SPOTS_SUCCESS, payload: response.spots });
  } catch (error) {
    yield put({ type: FETCH_SPOTS_FAILURE, error });
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

/**
 * Saga which saves offline map
 * @param {[type]} action        action.payload is a { bounds, zoomLevel } object
 * @yield {[type]} [description]
 */
function* saveOfflineMapSaga(action) {
  try {
    const response = yield call(Mapbox.addOfflinePack, {
      name: 'test', // required
      type: 'bbox', // required, only type currently supported
      metadata: { // optional. You can put any information in here that may be useful to you
          date: new Date(),
      },
      bounds: action.payload.bounds,
      minZoomLevel: action.payload.zoomLevel, // required
      maxZoomLevel: 18, // required
      styleURL: Mapbox.mapStyles.streets // required. Valid styleURL
    });
    console.log(response)
    yield put({ type: SAVE_OFFLINE_MAP_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: SAVE_OFFLINE_MAP_FAILURE, error });
  }
}

export default function* HitchhikingMapSaga() {
  yield [
    takeLatest(FETCH_SPOTS_REQUEST, fetchSpotsSaga),
    takeLatest(GET_LOCATION_REQUEST, getLocationSaga),
    takeLatest(SAVE_OFFLINE_MAP_REQUEST, saveOfflineMapSaga)
  ];
}
