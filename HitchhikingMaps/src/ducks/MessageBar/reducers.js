import types from './types';
import SnapshotsTypes from '../Snapshots/types'; // TODO not good here I think

const initialState = {
  message: ''
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case SnapshotsTypes.SAVE_SNAPSHOT_SUCCESS:
      return {
        ...state,
        message: 'Snapshot taken successfully'
      };
    default:
      return state;
  }
}
