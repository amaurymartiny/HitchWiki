import types from './types';

const fetchSnapshots = () => {
  return {
    type: types.FETCH_SNAPSHOTS_REQUEST
  };
}

const saveSnapshotRequest = () => {
  return {
    type: types.SAVE_SNAPSHOT_REQUEST,
  };
}

const saveSnapshotSuccess = uri => {
  return {
    type: types.SAVE_SNAPSHOT_SUCCESS,
    payload: uri
  };
}

const saveSnapshotFailure = error => {
  return {
    type: types.SAVE_SNAPSHOT_FAILURE,
    error: error
  };
}

const setPage = page => {
  return {
    type: types.SET_PAGE,
    payload: page
  }
}

export default {
  fetchSnapshots,
  saveSnapshotRequest,
  saveSnapshotSuccess,
  saveSnapshotFailure,
  setPage,
}