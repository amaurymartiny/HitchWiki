import types from './types';

fetchOfflineSpots = () => {
  return {
    type: types.FETCH_OFFLINE_SPOTS_REQUEST
  };
}

fetchOfflineSpot = (spotId) => {
  return {
    type: types.FETCH_OFFLINE_SPOT_REQUEST,
    payload: spotId
  };
}

saveOfflineSpot = (spotId, currentSpot) => {
  // bounds from Mapbox is [ latitudeSW, longitudeSW, latitudeNE, longitudeNE ]
  return {
    type: types.SAVE_OFFLINE_SPOT_REQUEST,
    payload: {
      spotId,
      currentSpot
    }
  }
}

deleteOfflineSpot = (spotId) => {
  return {
    type: types.DELETE_OFFLINE_SPOT_REQUEST,
    payload: spotId
  };
}

export default {
  fetchOfflineSpots,
  fetchOfflineSpot,
  saveOfflineSpot,
  deleteOfflineSpot,
}
