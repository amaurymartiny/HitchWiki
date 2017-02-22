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

const getLocation = () => {
  return {
    type: types.GET_LOCATION_REQUEST
  }
}

export default {
  fetchSpots,
  setRegion,
  getLocation
}