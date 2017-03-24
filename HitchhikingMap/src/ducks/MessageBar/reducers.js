import types from './types';

const initialState = {
  message: '',
  shouldHideAfterDelay: true,
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        shouldHideAfterDelay: action.payload.shouldHideAfterDelay,
      };
    case types.CLEAR_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
}
