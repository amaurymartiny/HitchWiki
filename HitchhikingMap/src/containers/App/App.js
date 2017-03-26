import React from 'react';
import { Provider } from 'react-redux';

import RootContainer from '../RootContainer/RootContainer';
import createStore from '../../redux/store';

// Create our store
const store = createStore();

/**
 * Provides an entry point into our application. Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
const App = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
);

export default App;
