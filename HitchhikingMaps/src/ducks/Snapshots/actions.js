import types from './types';

const fetchSnapshots = () => {
  return {
    type: types.FETCH_SNAPSHOTS_REQUEST
  };
}

const saveSnapshot = mapView => {
  return {
    type: types.SAVE_SNAPSHOT_REQUEST,
    payload: mapView
  };
}

export default {
  fetchSnapshots,
  saveSnapshot,
}