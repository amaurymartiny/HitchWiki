import types from './types';

// To get an idea of the API response:
// http://beta.hitchwiki.org/en/Special:ApiSandbox#action=hwspotidapi&format=json&page_id=22231&properties=Cities%2CCountry%2CCardinalDirection&user_id=0
export const initialState = {
  spot: {
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
    comments: [],
  }
};

export default function SpotDetailsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_SPOT_DETAILS_REQUEST:
      return initialState;
    case types.FETCH_SPOT_DETAILS_SUCCESS:
      return {
        ...state,
        spot: action.payload,
      };
    default:
      return state;
  }
}
