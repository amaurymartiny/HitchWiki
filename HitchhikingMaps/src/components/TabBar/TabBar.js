import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import { StackNavigation, TabNavigation, TabNavigationItem as TabItem, withNavigation } from '@exponent/ex-navigation';

import theme from '../../services/ThemeService';

@withNavigation
class TabBar extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  renderIcon = (title: string, iconName: string, isSelected: bool) => {
    const iconNameSelected = isSelected ? iconName : `${iconName}-outline`;

    return (
      <View style={styles.tabItemContainer}>
        <Icon name={iconNameSelected} size={32} color={theme.darkGrey} />

        <Text style={styles.tabTitleText} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
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
          renderIcon={isSelected => this.renderIcon('Map', 'ios-map', isSelected)}
        >
          <StackNavigation
            id="hitchhikingMap"
            navigatorUID="hitchhikingMap"
            initialRoute={Router.getRoute('hitchhikingMap')}
          />
        </TabItem>

        <TabItem
          id="settings"
          renderIcon={isSelected => this.renderIcon('Settings', 'ios-settings', isSelected)}
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
    color: theme.darkGrey
  },
});


export default TabBar;
