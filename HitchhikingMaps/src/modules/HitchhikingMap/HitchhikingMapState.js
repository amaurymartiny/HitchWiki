// ======================================================
// Actions
// ======================================================
export const FETCH_SPOTS_REQUEST = 'FETCH_SPOTS_REQUEST';
export const FETCH_SPOTS_SUCCESS = 'FETCH_SPOTS_SUCCESS';
export const FETCH_SPOTS_FAILURE = 'FETCH_SPOTS_FAILURE';

// ======================================================
// Action Creators
// ======================================================
export function fetchSpots(bounds) {
  return {
    type: FETCH_SPOTS_REQUEST,
    bounds: bounds
  }
}

// ======================================================
// Reducers
// ======================================================
const initialState = {
  annotations: [],
};
export default function HitchhikingMapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SPOTS_SUCCESS:
      return {
        ...state,
        annotations: spotsToAnnotations(action.payload)
      };
    default:
      return state;
  }
}

/**
 * Helper function to transform spots given by API to annotations in state
 * @param  {array}  spots Array of spots given by the API
 * @return {array}        Array of annotations understandable by mapbox
 */
function spotsToAnnotations(spots) {
  let annotations = [];
  for (let i = spots.length - 1; i >= 0; i--) {
    annotations.push({
      id: spots[i].id,
      coordinates: spots[i].location,
      title: spots[i].title,
      type: 'point',
      rightCalloutAccessory: {
        source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
        height: 25,
        width: 25
      }
    });
  }
  return annotations;
}
