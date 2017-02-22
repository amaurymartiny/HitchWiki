import types from './types';

export const initialState = {
  snapshots: []
};

export default function SnapshotReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_SNAPSHOTS_SUCCESS:
      return {
        ...state,
        snapshots: action.payload,
      };
    default:
      return state;
  }
}
