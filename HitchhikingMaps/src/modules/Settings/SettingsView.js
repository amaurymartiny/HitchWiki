import React, { PropTypes } from 'react';
import { Examples } from '@shoutem/ui';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
class SettingsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Settings'
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Examples />
    );
  }
}

export default SettingsView;
