import types from './types';

const saveOfflineSpotRequest = (id, spot, latlng) => {
  return {
    type: types.SAVE_OFFLINE_SPOT_REQUEST,
    payload: { id, spot, latlng }
  };
}

const saveOfflineSpotSuccess = (id, spot, latlng, uri) => {
  return {
    type: types.SAVE_OFFLINE_SPOT_SUCCESS,
    payload: { id, spot, latlng, uri }
  };
}

const saveOfflineSpotFailure = (error) => {
  return {
    type: types.SAVE_OFFLINE_SPOT_FAILURE,
    error,
  };
}

export default {
  saveOfflineSpotRequest,
  saveOfflineSpotSuccess,
  saveOfflineSpotFailure,
}
