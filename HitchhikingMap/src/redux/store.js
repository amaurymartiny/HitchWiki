import { createStore, applyMiddleware, compose } from 'redux';
// import { autoRehydrate } from 'redux-persist'
// import createSagaMiddleware from 'redux-saga'
// import RehydrationServices from '../Services/RehydrationServices'
// import ReduxPersist from '../Config/ReduxPersist'

import rootReducer from './reducer';

// creates the store
const configureStore = () => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  // const sagaMiddleware = createSagaMiddleware())
  // middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  // enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  // // add the autoRehydrate enhancer
  // if (ReduxPersist.active) {
  //   enhancers.push(autoRehydrate())
  // }

  // // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  // const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  // const store = createAppropriateStore(rootReducer, compose(...enhancers))
  const store = createStore(rootReducer, compose(...enhancers));

  // // configure persistStore and check reducer version number
  // if (ReduxPersist.active) {
  //   RehydrationServices.updateReducers(store)
  // }

  // // kick off root saga
  // sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore;
