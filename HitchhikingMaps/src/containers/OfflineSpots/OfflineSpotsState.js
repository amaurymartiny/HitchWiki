// import { initialState as spotInitialState } from '../SpotDetails/SpotDetailsState';

// ======================================================
// Actions
// ======================================================
export const FETCH_OFFLINE_SPOTS_REQUEST = 'FETCH_OFFLINE_SPOTS_REQUEST';
export const FETCH_OFFLINE_SPOTS_SUCCESS = 'FETCH_OFFLINE_SPOTS_SUCCESS';
export const FETCH_OFFLINE_SPOTS_FAILURE = 'FETCH_OFFLINE_SPOTS_FAILURE';

export const FETCH_OFFLINE_SPOT_REQUEST = 'FETCH_OFFLINE_SPOT_REQUEST';
export const FETCH_OFFLINE_SPOT_SUCCESS = 'FETCH_OFFLINE_SPOT_SUCCESS';
export const FETCH_OFFLINE_SPOT_FAILURE = 'FETCH_OFFLINE_SPOT_FAILURE';

export const SAVE_OFFLINE_SPOT_REQUEST = 'SAVE_OFFLINE_SPOT_REQUEST';
export const SAVE_OFFLINE_SPOT_SUCCESS = 'SAVE_OFFLINE_SPOT_SUCCESS';
export const SAVE_OFFLINE_SPOT_FAILURE = 'SAVE_OFFLINE_SPOT_FAILURE';

export const DELETE_OFFLINE_SPOT_REQUEST = 'DELETE_OFFLINE_SPOT_REQUEST';
export const DELETE_OFFLINE_SPOT_SUCCESS = 'DELETE_OFFLINE_SPOT_SUCCESS';
export const DELETE_OFFLINE_SPOT_FAILURE = 'DELETE_OFFLINE_SPOT_FAILURE';

// ======================================================
// Action Creators
// ======================================================
export function fetchOfflineSpots() {
  return {
    type: FETCH_OFFLINE_SPOTS_REQUEST
  };
}

export function fetchOfflineSpot(spotId) {
  return {
    type: FETCH_OFFLINE_SPOT_REQUEST,
    payload: spotId
  };
}

export function saveOfflineSpot(spotId, currentSpot) {
  // bounds from Mapbox is [ latitudeSW, longitudeSW, latitudeNE, longitudeNE ]
  return {
    type: SAVE_OFFLINE_SPOT_REQUEST,
    payload: {
      spotId,
      currentSpot
    }
  }
}

export function deleteOfflineSpot(spotId) {
  return {
    type: DELETE_OFFLINE_SPOT_REQUEST,
    payload: spotId
  };
}

// ======================================================
// Reducers
// ======================================================
const initialState = {
  spots: [], // TODO: ids of all spots
  currentSpot: null
};

export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_OFFLINE_SPOTS_SUCCESS:
      return {
        ...state,
        spots: action.payload
      };
    case SAVE_OFFLINE_SPOT_SUCCESS:
      return {
        ...state,
        currentSpot: action.payload.currentSpot,
        spots: action.payload.spots
      };
    case FETCH_OFFLINE_SPOT_SUCCESS:
      return {
        ...state,
        currentSpot: action.payload
      };
    case DELETE_OFFLINE_SPOT_REQUEST:
      return {
        ...state,
        currentSpot: null
      };
    default:
      return state;
  }
}