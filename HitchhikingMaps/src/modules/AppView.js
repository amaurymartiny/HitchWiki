import React, { PropTypes } from 'react';
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
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
