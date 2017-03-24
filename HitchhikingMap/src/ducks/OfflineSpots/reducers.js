import types from './types';

const initialState = {
  spots: {},
  currentSpot: null
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_OFFLINE_SPOT:
      // Create new spots object with our new addition
      let spots = { ...state.spots };
      spots[action.payload.id] = action.payload.spot;
      return {
        ...state,
        spots,
      }
    default:
      return state;
  }
}
