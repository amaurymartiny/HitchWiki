import types from './types';

const initialState = {
  appLoaded: false,
  showTutorial: true,
};
export default function AppStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_APP_LOADED:
      return {
        ...state,
        appLoaded: action.payload,
      };
    case types.SET_SHOW_TUTORIAL:
      return {
        ...state,
        showTutorial: action.payload,
      };
    default:
      return state;
  }
}
