import types from './types';

const initialState = {
  spots: {},
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  // Create new spots object if additional keys are required
  const spots = { ...state.spots };
  switch (action.type) {
    case types.SAVE_OFFLINE_SPOT_SUCCESS:
      spots[action.payload.id] = action.payload.spot;
      spots[action.payload.id].metadata = {
        latlng: action.payload.latlng,
        mapUri: action.payload.uri,
        dateAdded: new Date(),
      };
      return {
        ...state,
        spots,
      };
    default:
      return state;
  }
}
