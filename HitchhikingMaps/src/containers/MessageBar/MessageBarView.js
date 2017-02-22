import React from 'react';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import { MessageBarActions } from '../../ducks/MessageBar';
import theme from '../../services/ThemeService';

class MessageBarView extends React.Component {

  componentDidMount() {
    // Register the alert located on this master page
    // This MessageBar will be accessible from the current (same) component, and from its child component
    // The MessageBar is then declared only once, in your main component.
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentDidUpdate() {
    if (!this.props.message) {
      return;
    }
    MessageBarManager.showAlert({
      alertType: 'info',
      message: this.props.message,
      messageStyle: { color: 'white', fontSize: 14, textAlign: 'center', padding: 0 },
      stylesheetInfo : { backgroundColor : 'rgba(0, 0, 0, 0.7)', strokeColor : 'rgba(0, 0, 0, 0.7)' },
      shouldHideAfterDelay: this.props.shouldHideAfterDelay
    });
    // Clear message after showing it
    this.props.dispatch(MessageBarActions.setMessage(''));
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
