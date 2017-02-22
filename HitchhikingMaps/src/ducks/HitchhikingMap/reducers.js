import types from './types';

const initialState = {
  markers: [],
  // region: {
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // },
  isFetchingGPS: false
};
export default function HitchhikingMapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LOCATION_REQUEST:
      return {
        ...state,
        isFetchingGPS: true
      }
    case types.GET_LOCATION_SUCCESS:
      return {
        ...state,
        isFetchingGPS: false
      }
    // case types.SET_REGION:
    //   return {
    //     ...state,
    //     region: action.payload
    //   }
    case types.FETCH_SPOTS_SUCCESS:
      return {
        ...state,
        markers: action.payload,
      };
    default:
      return state;
  }
}
