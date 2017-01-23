import React, {PropTypes} from 'react';
import {Footer, FooterTab, Button, Icon} from 'native-base';

import {NavigationExperimental} from 'react-native';

const {
  PropTypes: NavigationPropTypes
} = NavigationExperimental;

const TabBar = React.createClass({
  propTypes: {
    tabs: NavigationPropTypes.navigationState.isRequired,
    currentTabIndex: PropTypes.number.isRequired,
    switchTab: PropTypes.func.isRequired
  },

  render() {
    const icons = ['ios-map', 'ios-bookmarks', 'ios-menu'] // Icon for each tab
    return (
      <Footer>
        <FooterTab>
          {this.props.tabs.routes.map((route, index) => (
            <Button
              key={'tab-bar-button-' + route.key}
              onPress={() => this.props.switchTab(index)}
              active={index === this.props.currentTabIndex}
            >
              {route.title}
              <Icon name={icons[index]} />
            </Button>
        ))}
        </FooterTab>
      </Footer>
    );
  }
});

export default TabBar;
