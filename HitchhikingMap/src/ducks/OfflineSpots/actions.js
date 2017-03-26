import types from './types';

const saveOfflineSpotRequest = (id, spot, latlng) => ({
  type: types.SAVE_OFFLINE_SPOT_REQUEST,
  payload: { id, spot, latlng },
});

const saveOfflineSpotSuccess = (id, spot, latlng, uri) => ({
  type: types.SAVE_OFFLINE_SPOT_SUCCESS,
  payload: { id, spot, latlng, uri },
});

const saveOfflineSpotFailure = error => ({
  type: types.SAVE_OFFLINE_SPOT_FAILURE,
  error,
});

export default {
  saveOfflineSpotRequest,
  saveOfflineSpotSuccess,
  saveOfflineSpotFailure,
};
