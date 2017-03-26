import React from 'react';
import { Navigator } from 'react-native';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import { MessageBarActions } from '../../ducks/MessageBar';
import theme from '../../services/ThemeService';

class MessageBarView extends React.Component {

  static propTypes = {
    message: React.PropTypes.string.isRequired,
    shouldHideAfterDelay: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Register the alert located on this master page
    // This MessageBar will be accessible from the current (same) component,
    // and from its child component
    // The MessageBar is then declared only once, in your main component.
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentDidUpdate() {
    if (!this.props.message) {
      return;
    }
    MessageBarManager.showAlert({
      alertType: 'success',
      message: this.props.message,
      messageStyle: { color: 'white', fontSize: 14, textAlign: 'center', padding: 0 },
      stylesheetSuccess: { backgroundColor: `${theme.green}D9`, strokeColor: `${theme.green}D9` }, // D9=85% opacity
      shouldHideAfterDelay: this.props.shouldHideAfterDelay,
      viewTopOffset: Navigator.NavigationBar.Styles.General.TotalNavHeight,
      animationType: 'SlideFromLeft',
      durationToShow: 1,
      durationToHide: 1,
    });

    // Clear message after showing it
    this.props.dispatch(MessageBarActions.clearMessage());
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return (
      <MessageBar ref="alert" />
    );
  }
}

export default MessageBarView;
