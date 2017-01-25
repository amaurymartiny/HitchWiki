import { fromJS } from 'immutable';

// ======================================================
// Actions
// ======================================================
export const FETCH_SPOT_DETAILS_REQUEST = 'FETCH_SPOT_DETAILS_REQUEST';
export const FETCH_SPOT_DETAILS_SUCCESS = 'FETCH_SPOT_DETAILS_SUCCESS';
export const FETCH_SPOT_DETAILS_FAILURE = 'FETCH_SPOT_DETAILS_FAILURE';

// ======================================================
// Action Creators
// ======================================================
export function fetchSpotDetails(pointId) {
  console.log(pointId);
  return (dispatch) => {
    dispatch({ type: FETCH_SPOT_DETAILS_REQUEST });
    return fetch(`http://beta.hitchwiki.org/en/api.php?action=hwspotidapi&page_id=${pointId}&format=json&user_id=26375&properties=a`)
      .then(response => response.json())
      .then(json => dispatch({ type: FETCH_SPOT_DETAILS_SUCCESS, details: json.query.spot }))
      .catch(error => dispatch({ type: FETCH_SPOT_DETAILS_FAILURE, error }));
  };
}

// ======================================================
// Reducers
// ======================================================
const initialState = fromJS({});
export default function SpotDetailsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SPOT_DETAILS_SUCCESS:
      return fromJS(action.details);
    default:
      return state;
  }
}
