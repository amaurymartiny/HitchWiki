import React, { PropTypes } from 'react';
import AppNavigator from './AppNavigator';

class AppView extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}
export default AppView;
