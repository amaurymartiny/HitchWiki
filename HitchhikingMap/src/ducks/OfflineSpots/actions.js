import types from './types';

const saveOfflineSpot = (id, spot, latlng) => { 
  return {
    type: types.SAVE_OFFLINE_SPOT,
    payload: { id, spot, latlng }
  };
}

const saveStaticMapRequest = (latlng) => {
  return {
    type: types.SAVE_STATIC_MAP_REQUEST,
    payload: latlng
  };
}

const saveStaticMapSuccess = (uri) => {
  return {
    type: types.SAVE_STATIC_MAP_SUCCESS,
    payload: uri
  };
}

const saveStaticMapFailure = (error) => {
  return {
    type: types.SAVE_STATIC_MAP_FAILURE,
    error,
  };
}

export default {
  saveOfflineSpot,
  saveStaticMapRequest,
  saveStaticMapSuccess,
  saveStaticMapFailure,
}
