import types from './types';

const initialState = {
  spots: {}
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_OFFLINE_SPOT_SUCCESS:
      // Create new spots object with our new addition
      let spots = { ...state.spots };
      spots[action.payload.id] = action.payload.spot;
      spots[action.payload.id].metadata = {
        latlng: action.payload.latlng,
        mapUri: action.payload.uri,
        dateAdded: new Date()
      };
      return {
        ...state,
        spots,
      }
    default:
      return state;
  }
}
