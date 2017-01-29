// https://github.com/mapbox/react-native-mapbox-gl/issues/406
const resolveAssetSource = require('resolveAssetSource'); // eslint-disable-line

// ======================================================
// Actions
// ======================================================
export const GET_LOCATION_REQUEST = 'GET_LOCATION_REQUEST';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAILURE = 'GET_LOCATION_FAILURE';

export const SET_LOCATION = 'SET_LOCATION';

export const FETCH_SPOTS_REQUEST = 'FETCH_SPOTS_REQUEST';
export const FETCH_SPOTS_SUCCESS = 'FETCH_SPOTS_SUCCESS';
export const FETCH_SPOTS_FAILURE = 'FETCH_SPOTS_FAILURE';

export const SET_ZOOM_LEVEL = 'SET_ZOOM_LEVEL';

// ======================================================
// Action Creators
// ======================================================
export function fetchSpots(bounds) {
  // bounds from Mapbox is [ latitudeSW, longitudeSW, latitudeNE, longitudeNE ]
  return {
    type: FETCH_SPOTS_REQUEST,
    payload: { bounds }
  };
}

export function setZoomLevel(zoomLevel) {
  return {
    type: SET_ZOOM_LEVEL,
    payload: { zoomLevel }
  };
}

export function setLocation(latitude, longitude) {
  return {
    type: SET_LOCATION,
    payload: {
      latitude,
      longitude
    }
  };
}

export function getLocation() {
  return {
    type: GET_LOCATION_REQUEST
  }
}

// ======================================================
// Reducers
// ======================================================
/**
 * Helper function to transform spots given by API to annotations understandable by Mapbox
 * Maybe put in a middleware TODO
 * @param  {array}  spots Array of spots given by the API
 * @return {array}        Array of annotations understandable by mapbox
 */
function spotsToAnnotations(spots) {
  // Print as text number of stars
  function drawStars(number) {
    return '★'.repeat(number) + '☆'.repeat(5 - number);
  }
  // Find the right marker image according to rating
  // Note: the require needs to be static
  function getAnnotationImage(number) {
    switch (number) {
      case 5:
        return resolveAssetSource(require('../../../images/annotation5.png')); // eslint-disable-line
      case 4:
        return resolveAssetSource(require('../../../images/annotation4.png')); // eslint-disable-line
      case 3:
        return resolveAssetSource(require('../../../images/annotation3.png')); // eslint-disable-line
      case 2:
        return resolveAssetSource(require('../../../images/annotation2.png')); // eslint-disable-line
      default:
        return resolveAssetSource(require('../../../images/annotation1.png')); // eslint-disable-line
    }
  }

  const annotations = [];
  for (let i = spots.length - 1; i >= 0; i -= 1) {
    const averageRating = Math.floor(Math.random() * (5 + 1)); // TODO fix API
    annotations.push({
      id: spots[i].id,
      coordinates: spots[i].location,
      title: `Spot: ${drawStars(averageRating)}`,
      // subtitle: drawStars(averageRating),
      type: 'point',
      annotationImage: {
        source: getAnnotationImage(averageRating),
        height: 25,
        width: 18,
      },
      rightCalloutAccessory: {
        source: resolveAssetSource(require('../../../images/next.png')), // eslint-disable-line
        height: 25,
        width: 25,
      },
    });
  }
  return annotations;
}

const initialState = {
  annotations: [],
  location: {
    latitude: 48.8566, // Paris coordinates
    longitude: 2.3522
  },
  zoomLevel: 11
};
export default function HitchhikingMapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude
        }
      }
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    case FETCH_SPOTS_SUCCESS:
      return {
        ...state,
        annotations: spotsToAnnotations(action.payload),
      };
    case SET_ZOOM_LEVEL:
      return {
        ...state,
        zoomLevel: action.payload.zoomLevel
      };
    default:
      return state;
  }
}
