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

export default {
  setMessage,
}
