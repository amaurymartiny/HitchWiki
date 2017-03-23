import types from './types';

const setMessage = (message, shouldHideAfterDelay = true) => {
  return {
    type: types.SET_MESSAGE,
    payload: {
      message,
      shouldHideAfterDelay
    }
  }
}

const clearMessage = () => {
  return {
    type: types.CLEAR_MESSAGE
  };
}

export default {
  setMessage,
  clearMessage,
}
