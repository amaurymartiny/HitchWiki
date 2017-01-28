import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import middleware from './middleware';
import reducer from './reducer';
import rootSaga from './saga';

import SpotDetailsSaga from '../modules/SpotDetails/SpotDetailsSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(...middleware, thunkMiddleware, sagaMiddleware, createLogger())
);

// create the store
const store = createStore(
  reducer,
  {},
  enhancer,
);

sagaMiddleware.run(SpotDetailsSaga);

export default store;
