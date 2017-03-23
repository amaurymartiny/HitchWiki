import types from './types';

export const initialState = {
  snapshots: [],
  currentPage: 0
};

export default function SnapshotReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_SNAPSHOTS_SUCCESS:
      return {
        ...state,
        snapshots: action.payload,
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
