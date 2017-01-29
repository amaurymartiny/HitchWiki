import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

class HitchhikingMaps extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('HitchhikingMaps', () => HitchhikingMaps);
