import types from './types';

const fetchSpotDetails = spotId => {
  return {
    type: types.FETCH_SPOT_DETAILS_REQUEST,
    spotId,
  };
}

export default {
  fetchSpotDetails,
}