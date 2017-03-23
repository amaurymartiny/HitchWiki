import types from './types';

const initialState = {
  spots: [], // TODO: ids of all spots
  currentSpot: null
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_OFFLINE_SPOTS_SUCCESS:
      return {
        ...state,
        spots: action.payload
      };
    case types.SAVE_OFFLINE_SPOT_SUCCESS:
      return {
        ...state,
        currentSpot: action.payload.currentSpot,
        spots: action.payload.spots
      };
    case types.FETCH_OFFLINE_SPOT_SUCCESS:
      return {
        ...state,
        currentSpot: action.payload
      };
    case types.DELETE_OFFLINE_SPOT_REQUEST:
      return {
        ...state,
        currentSpot: null
      };
    default:
      return state;
  }
}
