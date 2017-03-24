import types from './types';

const initialState = {
  spots: {}
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_OFFLINE_SPOT_SUCCESS:
      // Create new spots object with our new addition
      let spots = { ...state.spots };
      console.log('id', action.payload.id)
      console.log(spots)
      spots[action.payload.id] = action.payload.spot;
      console.log(spots)
      spots[action.payload.id].latlng = action.payload.latlng;
      spots[action.payload.id].mapUri = action.payload.uri;
      return {
        ...state,
        spots,
      }
    default:
      return state;
  }
}
