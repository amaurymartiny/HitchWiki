import React, { PropTypes } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { createRouter, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';

import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/Session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

import Router from './AppRouter';

class AppView extends React.Component {

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  // Create snapshot from previous state, is that what this is doing?
  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then((snapshot) => {
        const { dispatch } = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('tabBar')} />
        <DeveloperMenu />
      </NavigationProvider>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default AppView;
