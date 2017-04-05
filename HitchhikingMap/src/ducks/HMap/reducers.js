import types from './types';

const initialState = {
  markers: [],
  region: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  isFetchingGPS: false,
  isFetchingSpots: false,
};
export default function HitchhikingMapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_SPOTS_REQUEST:
      return {
        ...state,
        isFetchingSpots: true,
      };
    case types.FETCH_SPOTS_SUCCESS:
      return {
        ...state,
        markers: action.payload,
        isFetchingSpots: false,
      };
    case types.FETCH_SPOTS_FAILURE:
      return {
        ...state,
        isFetchingSpots: false,
      };
    case types.GET_LOCATION_REQUEST:
      return {
        ...state,
        isFetchingGPS: true,
      };
    case types.GET_LOCATION_SUCCESS:
    case types.GET_LOCATION_FAILURE:
      return {
        ...state,
        isFetchingGPS: false,
      };
    case types.SET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case types.SET_TUTORIAL:
      return {
        ...state,
        tutorial: action.payload,
      };
    default:
      return state;
  }
}
