import types from './types';

const fetchSpotDetailsRequest = spotId => ({
  type: types.FETCH_SPOT_DETAILS_REQUEST,
  payload: spotId,
});

const fetchSpotDetailsSuccess = spot => ({
  type: types.FETCH_SPOT_DETAILS_SUCCESS,
  payload: spot,
});

const fetchSpotDetailsFailure = error => ({
  type: types.FETCH_SPOT_DETAILS_FAILURE,
  error,
});

export default {
  fetchSpotDetailsRequest,
  fetchSpotDetailsSuccess,
  fetchSpotDetailsFailure,
};
