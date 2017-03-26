import types from './types';

export const initialState = {
  snapshots: [],
  currentPage: 0,
};

export default function SnapshotReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_SNAPSHOT_SUCCESS:
      // Clone the snapshots array and push new element
      return {
        ...state,
        snapshots: state.snapshots.concat([{
          uri: action.payload,
          date: new Date(),
        }]),
      };
    case types.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}
