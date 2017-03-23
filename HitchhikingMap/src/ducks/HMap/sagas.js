import { call, cps, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import types from './types';
import actions from './actions';
import ApiService from '../../services/ApiService';

/**
 * Saga which fetches the spots inside bounds from HitchWiki API 
 * @param {[type]} action        action.payload is a region object
 * @yield {[type]} [description]
 */
function* fetchSpotsSaga(action) {
  try {
    // First step is to make the API call with correct bounds
    const response = yield call(ApiService, `action=hwmapapi&format=json&SWlat=${action.payload.latitude - Math.min(action.payload.latitudeDelta, 1)}&SWlon=${action.payload.longitude - Math.min(action.payload.longitudeDelta, 1)}&NElat=${action.payload.latitude + Math.min(action.payload.latitudeDelta, 1)}&NElon=${action.payload.longitude + Math.min(action.payload.longitudeDelta, 1)}`);

    // Second step is to transfrom Hitchwiki Spots to Map Markers
    function spotsToMarkers(spots) {
      if (!spots) return [];

      const markers = [];
      for (let i = spots.length - 1; i >= 0; i -= 1) {
        markers.push({
          id: spots[i].id,
          latlng: {
            latitude: parseFloat(spots[i].location[0]),
            longitude: parseFloat(spots[i].location[1])
          },
          rating: Math.round(spots[i].average_rating)
        });
      }
      return markers;
    }

    yield put({ type: types.FETCH_SPOTS_SUCCESS, payload: spotsToMarkers(response.spots) });
  } catch (error) {
    yield put({ type: types.FETCH_SPOTS_FAILURE, error });
  }
}

/**
 * Saga which get the current GPS location
 * @param {[type]} action        action.payload is a the reference to the MapView object
 * @yield {[type]} [description]
 */
function* getLocationSaga(action) {
  // geolocation.getCurrentPosition's footprint is (dataCallback, errorCallback, options)
  // cps needs a function whose footprint is (err, data) => ...
  // This function makes the change
  function getCurrentPosition(callback) {
    return navigator.geolocation.getCurrentPosition(
      position => { return callback(null, position); },
      error => { return callback(error, null); },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  
  try {
    // yield delay(1000); // TODO needs this to change button white, for better UX.
    const position = yield cps(getCurrentPosition);
    // Create a new region to zoom into
    const newRegion = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    };

    // Navigate to new position
    yield put({ type: types.SET_REGION, payload: newRegion});
    // yield action.payload.animateToRegion(newRegion);
    // yield put({ type: types.GET_LOCATION_SUCCESS }); // call this when map finishes regionChange
    yield delay(1000); // Better UX
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
