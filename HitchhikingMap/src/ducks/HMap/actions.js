import types from './types';

const fetchSpotsRequest = (region) => {
  return {
    type: types.FETCH_SPOTS_REQUEST,
    payload: region
  };
}

const setRegion = (region) => {
  return {
    type: types.SET_REGION,
    payload: region
  };
}

const getLocation = () => {
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

export default {
  fetchSpotsRequest,
  setRegion,
  getLocation,
  getLocationSuccess,
}