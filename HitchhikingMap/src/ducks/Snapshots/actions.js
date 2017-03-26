import types from './types';

const saveSnapshotRequest = snapshot => ({
  type: types.SAVE_SNAPSHOT_REQUEST,
  payload: snapshot,
});

const saveSnapshotSuccess = uri => ({
  type: types.SAVE_SNAPSHOT_SUCCESS,
  payload: uri,
});

const saveSnapshotFailure = error => ({
  type: types.SAVE_SNAPSHOT_FAILURE,
  error,
});

const setPage = page => ({
  type: types.SET_PAGE,
  payload: page,
});

export default {
  saveSnapshotRequest,
  saveSnapshotSuccess,
  saveSnapshotFailure,
  setPage,
};
