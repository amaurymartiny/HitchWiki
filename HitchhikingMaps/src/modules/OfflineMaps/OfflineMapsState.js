// ======================================================
// Actions
// ======================================================
export const FETCH_OFFLINE_MAPS_REQUEST = 'FETCH_OFFLINE_MAPS_REQUEST';
export const FETCH_OFFLINE_MAPS_SUCCESS = 'FETCH_OFFLINE_MAPS_SUCCESS';
export const FETCH_OFFLINE_MAPS_FAILURE = 'FETCH_OFFLINE_MAPS_FAILURE';

export const SAVE_OFFLINE_MAP_REQUEST = 'SAVE_OFFLINE_MAP_REQUEST';
export const SAVE_OFFLINE_MAP_SUCCESS = 'SAVE_OFFLINE_MAP_SUCCESS';
export const SAVE_OFFLINE_MAP_FAILURE = 'SAVE_OFFLINE_MAP_FAILURE';
export const SAVE_OFFLINE_MAP_PROGRESS = 'SAVE_OFFLINE_MAP_PROGRESS';

export const DELETE_OFFLINE_MAP_REQUEST = 'DELETE_OFFLINE_MAP_REQUEST';
export const DELETE_OFFLINE_MAP_SUCCESS = 'DELETE_OFFLINE_MAP_SUCCESS';
export const DELETE_OFFLINE_MAP_FAILURE = 'DELETE_OFFLINE_MAP_FAILURE';

export const SHOW_DELETING_PACK_MODAL = 'SHOW_DELETING_PACK_MODAL';
export const HIDE_DELETING_PACK_MODAL = 'HIDE_DELETING_PACK_MODAL';

// ======================================================
// Action Creators
// ======================================================
export function fetchOfflineMaps() {
  return {
    type: FETCH_OFFLINE_MAPS_REQUEST
  };
}

export function saveOfflineMap(bounds, zoomLevel, annotations) {
  // bounds from Mapbox is [ latitudeSW, longitudeSW, latitudeNE, longitudeNE ]
  return {
    type: SAVE_OFFLINE_MAP_REQUEST,
    payload: {
      bounds,
      zoomLevel,
      annotations
    }
  }
}

export function saveOfflineMapProgress(progress) {
  return {
    type: SAVE_OFFLINE_MAP_PROGRESS,
    payload: progress
  }
}

export function deleteOfflineMap(packName) {
  return {
    type: DELETE_OFFLINE_MAP_REQUEST,
    payload: packName
  };
}

export function showDeletingPackModal(packName) {
  return {
    type: SHOW_DELETING_PACK_MODAL,
    payload: packName
  };
}

export function hideDeletingPackModal() {
  return {
    type: HIDE_DELETING_PACK_MODAL
  };
}

// ======================================================
// Reducers
// ======================================================
// To get an idea of the API response:
// http://beta.hitchwiki.org/en/Special:ApiSandbox#action=hwspotidapi&format=json&page_id=22231&properties=Cities%2CCountry%2CCardinalDirection&user_id=0
const initialState = {
  packs: [],
  offlineAnnotations: [],
  deletingPack: null,
  progress: null
};

export default function OfflineMapsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_OFFLINE_MAPS_SUCCESS:
      return {
        ...state,
        packs: action.payload.packs,
        offlineAnnotations: action.payload.offlineAnnotations
      };
    case SAVE_OFFLINE_MAP_PROGRESS:
      return {
        ...state,
        progress: action.payload
      };
    case DELETE_OFFLINE_MAP_REQUEST:
    case DELETE_OFFLINE_MAP_SUCCESS:
      return {
        ...state,
        progress: null
      };
    case SHOW_DELETING_PACK_MODAL:
      return {
        ...state,
        deletingPack: action.payload
      };
    case HIDE_DELETING_PACK_MODAL:
      return {
        ...state,
        deletingPack: null
      };
    default:
      return state;
  }
}
