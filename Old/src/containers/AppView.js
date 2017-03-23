import React, { PropTypes } from 'react';
import AppNavigator from './AppNavigator';
import Background from '../components/Background/Background';

class AppView extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Background>
        <AppNavigator />
      </Background>
    );
  }
}
export default AppView;
