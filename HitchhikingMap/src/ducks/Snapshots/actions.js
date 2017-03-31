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

export default {
  saveSnapshotRequest,
  saveSnapshotSuccess,
  saveSnapshotFailure,
};
