import React from 'react';
import { StyleSheet, Colors } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitleText: {
    fontSize: 11,
  },
});

export default TabBar;
