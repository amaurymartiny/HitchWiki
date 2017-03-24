import types from './types';

const saveOfflineSpot = (id, spot) => { 
  return {
    type: types.SAVE_OFFLINE_SPOT,
    payload: { id, spot }
  };
}

export default {
  saveOfflineSpot,
}
