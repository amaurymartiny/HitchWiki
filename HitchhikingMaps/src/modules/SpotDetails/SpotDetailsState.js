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
    return fetch(`http://beta.hitchwiki.org/en/api.php?action=hwspotidapi&page_id=${pointId}&format=json&properties=Cities%2CCountry%2CCardinalDirection&user_id=0`)
      .then(response => response.json())
      .then(json => dispatch({ type: FETCH_SPOT_DETAILS_SUCCESS, details: json.query.spot }))
      .catch(error => dispatch({ type: FETCH_SPOT_DETAILS_FAILURE, error }));
  };
}

// ======================================================
// Reducers
// ======================================================
// To get an idea of the API response:
// http://beta.hitchwiki.org/en/Special:ApiSandbox#action=hwspotidapi&format=json&page_id=22231&properties=Cities%2CCountry%2CCardinalDirection&user_id=0
const initialState = {
  title: '',
  Cities: [],
  Country: [],
  CardinalDirection: [],
  Description: '',
  rating_average: 0,
  rating_count: 0,
  rating_user: null,
  timestamp_user: null,
  ratings: [],
  waiting_time_average: 0,
  waiting_time_count: 0,
  comment_count: 0,
  comments: []
};

export default function SpotDetailsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_SPOT_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.details
      };
    default:
      return state;
  }
}
