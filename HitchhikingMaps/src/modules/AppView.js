import React, { PropTypes } from 'react';
import { createRouter, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';

import store from '../redux/store';
import Router from './AppRouter';

class AppView extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('tabBar')} />
      </NavigationProvider>
    );
  }
}
export default AppView;
