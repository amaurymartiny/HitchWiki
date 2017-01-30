// ======================================================
// Actions
// ======================================================
export const FETCH_OFFLINE_MAPS_REQUEST = 'FETCH_OFFLINE_MAPS_REQUEST';
export const FETCH_OFFLINE_MAPS_SUCCESS = 'FETCH_OFFLINE_MAPS_SUCCESS';
export const FETCH_OFFLINE_MAPS_FAILURE = 'FETCH_OFFLINE_MAPS_FAILURE';

export const DELETE_OFFLINE_MAP_REQUEST = 'DELETE_OFFLINE_MAP_REQUEST';
export const DELETE_OFFLINE_MAP_SUCCESS = 'DELETE_OFFLINE_MAP_SUCCESS';
export const DELETE_OFFLINE_MAP_FAILURE = 'DELETE_OFFLINE_MAP_FAILURE';

// ======================================================
// Action Creators
// ======================================================
export function fetchOfflineMaps() {
  return {
    type: FETCH_OFFLINE_MAPS_REQUEST
  };
}

export function deleteOfflineMap(packName) {
  return {
    type: DELETE_OFFLINE_MAP_REQUEST,
    payload: packName
  };
}

// ======================================================
// Reducers
// ======================================================
// To get an idea of the API response:
// http://beta.hitchwiki.org/en/Special:ApiSandbox#action=hwspotidapi&format=json&page_id=22231&properties=Cities%2CCountry%2CCardinalDirection&user_id=0
const initialState = {
  packs: []
};

export default function OfflineMapsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_OFFLINE_MAPS_SUCCESS:
      return {
        ...state,
        packs: action.payload,
      };
    default:
      return state;
  }
}
