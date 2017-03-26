import types from './types';

const setMessage = (message, shouldHideAfterDelay = true) => ({
  type: types.SET_MESSAGE,
  payload: {
    message,
    shouldHideAfterDelay,
  },
});

const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export default {
  setMessage,
  clearMessage,
};
