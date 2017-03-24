import types from './types';

const saveSnapshotRequest = snapshot => {
  return {
    type: types.SAVE_SNAPSHOT_REQUEST,
    payload: snapshot,
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
  saveSnapshotRequest,
  saveSnapshotSuccess,
  saveSnapshotFailure,
  setPage,
}