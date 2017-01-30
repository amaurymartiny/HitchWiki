// ======================================================
// Actions
// ======================================================
export const FETCH_OFFLINE_MAPS_REQUEST = 'FETCH_OFFLINE_MAPS_REQUEST';
export const FETCH_OFFLINE_MAPS_SUCCESS = 'FETCH_OFFLINE_MAPS_SUCCESS';
export const FETCH_OFFLINE_MAPS_FAILURE = 'FETCH_OFFLINE_MAPS_FAILURE';

// ======================================================
// Action Creators
// ======================================================
export function fetchOfflineMaps() {
  return {
    type: FETCH_SPOT_DETAILS_REQUEST
  };
}

// ======================================================
// Reducers
// ======================================================
// To get an idea of the API response:
// http://beta.hitchwiki.org/en/Special:ApiSandbox#action=hwspotidapi&format=json&page_id=22231&properties=Cities%2CCountry%2CCardinalDirection&user_id=0
const initialState = {
  offlineMaps: []
};

export default function SpotDetailsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_OFFLINE_MAPS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}