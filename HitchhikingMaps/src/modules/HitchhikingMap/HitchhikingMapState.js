// ======================================================
// Actions
// ======================================================
export const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';

export const FETCH_POINTS_REQUEST = 'FETCH_POINTS_REQUEST';
export const FETCH_POINTS_SUCCESS = 'FETCH_POINTS_SUCCESS';
export const FETCH_POINTS_FAILURE = 'FETCH_POINTS_FAILURE';

// ======================================================
// Action Creators
// ======================================================
export function fetchCountries() {
  return (dispatch) => {
    dispatch({ type: FETCH_COUNTRIES_REQUEST });
    return fetch('https://hitchwiki.org/maps/api/?countries&coordinates')
      .then(response => response.json())
      .then(json => dispatch({ type: FETCH_COUNTRIES_SUCCESS, countries: json }))
      .catch(error => dispatch({ type: FETCH_COUNTRIES_FAILURE, error }));
  };
}

export function fetchPoints(bounds) {
  bounds = '49,50,0,10';
  return (dispatch) => {
    dispatch({ type: FETCH_POINTS_REQUEST });
    return fetch(`https://hitchwiki.org/maps/api/?bounds=${bounds}`)
      .then(response => response.json())
      .then(json => dispatch({ type: FETCH_POINTS_SUCCESS, points: json }))
      .catch(error => dispatch({ type: FETCH_POINTS_FAILURE, error }));
  };
}

// ======================================================
// Reducers
// ======================================================
const initialState = {
  countries: {},
  points: [],
};
export default function HitchhikingMapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.countries
      };
    case FETCH_POINTS_SUCCESS:
      return {
        ...state,
        points: action.spots
      };
    default:
      return state;
  }
}
