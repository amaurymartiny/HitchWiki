import types from './types';

const fetchSpots = (region) => {
  return {
    type: types.FETCH_SPOTS_REQUEST,
    payload: region
  };
}

const setRegion = (region) => {
  console.log(region)
  return {
    type: types.SET_REGION,
    payload: region
  };
}

const getLocation = (mapView) => {
  // mapView is a reference to the MapView object
  return {
    type: types.GET_LOCATION_REQUEST,
    payload: mapView
  }
}

export default {
  fetchSpots,
  setRegion,
  getLocation
}