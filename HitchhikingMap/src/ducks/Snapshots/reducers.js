import types from './types';

export const initialState = {
  snapshots: [],
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
    default:
      return state;
  }
}
