import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import { autoRehydrate, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
// import RehydrationServices from '../Services/RehydrationServices'
// import ReduxPersist from '../Config/ReduxPersist'

import rootReducer from './reducer';
import rootSaga from './saga';

// creates the store
const configureStore = () => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];

  // Add redux-logger in dev mode
  if (process.env !== 'production') {
    middleware.push(createLogger());
  }
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  /* ------------- AutoRehydrate Enhancer ------------- */

  // // add the autoRehydrate enhancer
  // if (ReduxPersist.active) {
  enhancers.push(autoRehydrate());
  // }

  // // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  // const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  // const store = createAppropriateStore(rootReducer, compose(...enhancers))
  const store = createStore(rootReducer, compose(...enhancers));

  // begin periodically persisting the store
  persistStore(store, {
    whitelist: ['offlineSpots', 'snapshots'],
    storage: AsyncStorage,
  });

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
