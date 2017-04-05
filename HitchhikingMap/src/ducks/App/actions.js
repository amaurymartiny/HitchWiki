import types from './types';

const setAppLoaded = loaded => ({
  type: types.SET_APP_LOADED,
  payload: loaded,
});

const setShowTutorial = tutorial => ({
  type: types.SET_SHOW_TUTORIAL,
  payload: tutorial,
});

export default {
  setAppLoaded,
  setShowTutorial,
};
