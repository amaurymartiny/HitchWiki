// https://github.com/mapbox/react-native-mapbox-gl/issues/406
const resolveAssetSource = require('resolveAssetSource'); // eslint-disable-line

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
 * Helper function to transform spots given by API to annotations understandable by Mapbox
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
    switch(number) {
      case 5:
        return resolveAssetSource(require('../../../images/annotation5.png'));
      case 4:
        return resolveAssetSource(require('../../../images/annotation4.png'));
      case 3:
        return resolveAssetSource(require('../../../images/annotation3.png'));
      case 2:
        return resolveAssetSource(require('../../../images/annotation2.png'));
      default:
        return resolveAssetSource(require('../../../images/annotation1.png'));
    }
  }

  let annotations = [];
  for (let i = spots.length - 1; i >= 0; i--) {
    const average_rating = Math.floor(Math.random() * (5 + 1)); // TODO fix API
    annotations.push({
      id: spots[i].id,
      coordinates: spots[i].location,
      title: spots[i].title,
      subtitle: drawStars(average_rating),
      type: 'point',
      annotationImage: {
        source: getAnnotationImage(average_rating),
        height: 25,
        width: 18
      },
      rightCalloutAccessory: {
        source: resolveAssetSource(require('../../../images/next.png')),
        height: 25,
        width: 25
      }
    });
  }
  return annotations;
}
