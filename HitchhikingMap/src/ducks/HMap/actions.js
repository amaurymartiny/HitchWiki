import types from './types';

const fetchSpotsRequest = region => ({
  type: types.FETCH_SPOTS_REQUEST,
  payload: region,
});

const fetchSpotsSuccess = region => ({
  type: types.FETCH_SPOTS_SUCCESS,
  payload: region,
});

const fetchSpotsFailure = error => ({
  type: types.FETCH_SPOTS_FAILURE,
  error,
});

const getLocationRequest = () => ({
  type: types.GET_LOCATION_REQUEST,
    // payload: mapView
});

const getLocationSuccess = () => ({
  type: types.GET_LOCATION_SUCCESS,
});

const getLocationFailure = error => ({
  type: types.GET_LOCATION_FAILURE,
  error,
});

const setRegion = region => ({
  type: types.SET_REGION,
  payload: region,
});

export default {
  fetchSpotsRequest,
  fetchSpotsSuccess,
  fetchSpotsFailure,
  getLocationRequest,
  getLocationSuccess,
  getLocationFailure,
  setRegion,
};
