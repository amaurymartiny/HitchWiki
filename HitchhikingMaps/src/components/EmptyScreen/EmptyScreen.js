import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import theme from '../../services/ThemeService';

class TabBar extends React.Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#777', textAlign: 'center' }}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#eee'
  }
});


export default TabBar;
