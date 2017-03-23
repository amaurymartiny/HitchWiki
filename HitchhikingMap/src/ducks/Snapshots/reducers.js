import types from './types';

export const initialState = {
  snapshots: [],
  currentPage: 0
};

export default function SnapshotReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_SNAPSHOT_SUCCESS:
      return {
        ...state,
        snapshots: state.snapshots.slice(0).push({
          uri: action.payload,
          date: new Date(),
        }),
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
