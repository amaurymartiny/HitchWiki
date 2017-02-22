import types from './types';

const setMessage = message => {
  return {
    type: types.SET_MESSAGE,
    payload: message
  }
}

export default {
  setMessage,
}
