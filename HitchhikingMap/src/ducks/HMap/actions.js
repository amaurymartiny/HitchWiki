import types from './types';

const fetchSpotsRequest = (region) => {
  return {
    type: types.FETCH_SPOTS_REQUEST,
    payload: region
  };
}

const fetchSpotsSuccess = (region) => {
  return {
    type: types.FETCH_SPOTS_SUCCESS,
    payload: region
  };
}

const fetchSpotsFailure = (error) => {
  return {
    type: types.FETCH_SPOTS_FAILURE,
    error,
  };
}

const getLocationRequest = () => {
  return {
    type: types.GET_LOCATION_REQUEST,
    // payload: mapView
  }
}

const getLocationSuccess = () => {
  return {
    type: types.GET_LOCATION_SUCCESS,
  }
}

const getLocationFailure = (error) => {
  return {
    type: types.GET_LOCATION_FAILURE,
    error
  }
}

const setRegion = (region) => {
  return {
    type: types.SET_REGION,
    payload: region
  };
}

export default {
  fetchSpotsRequest,
  fetchSpotsSuccess,
  fetchSpotsFailure,
  getLocationRequest,
  getLocationSuccess,
  getLocationFailure,
  setRegion,
}