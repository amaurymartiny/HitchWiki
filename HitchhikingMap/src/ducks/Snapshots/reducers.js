import types from './types';

export const initialState = {
  snapshots: [],
  currentPage: 0
};

export default function SnapshotReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_SNAPSHOT_SUCCESS:
      // Clone the snapshots array and push new element
      let snapshots = state.snapshots.slice(0);
      snapshots.push({
        uri: action.payload,
        date: new Date(),
      });
      return {
        ...state,
        snapshots,
      };
    case types.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
}
