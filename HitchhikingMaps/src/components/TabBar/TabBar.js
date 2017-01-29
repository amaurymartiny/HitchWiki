import React from 'react';
import { StackNavigation, TabNavigation, TabNavigationItem as TabItem, withNavigation } from '@exponent/ex-navigation';

@withNavigation
class TabBar extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <TabNavigation
        id="main"
        navigatorUID="main"
        initialTab="hitchhikingMap"
      >
        <TabItem
          id="hitchhikingMap"
          title="Map"
        >
          <StackNavigation
            id="hitchhikingMap"
            navigatorUID="hitchhikingMap"
            initialRoute={Router.getRoute('hitchhikingMap')}
          />
        </TabItem>

        <TabItem
          id="settings"
          title="Settings"
        >
          <StackNavigation
            id="Settings"
            initialRoute={Router.getRoute('settings')}
          />
        </TabItem>

      </TabNavigation>
    );
  }
}

export default TabBar;
