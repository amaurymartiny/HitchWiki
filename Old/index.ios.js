import React from 'react';
import {AppRegistry} from 'react-native';
import codePush from "react-native-code-push";
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/containers/AppViewContainer';

class HitchhikingMaps extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('HitchhikingMaps', () => codePush(HitchhikingMaps));
