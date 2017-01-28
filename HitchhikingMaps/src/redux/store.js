import { applyMiddleware, createStore, compose } from 'redux';

import middleware from './middleware';
import reducer from './reducer';

const enhancer = compose(
  applyMiddleware(...middleware)
);

// create the store
const store = createStore(
  reducer,
  {},
  enhancer,
);

export default store;
