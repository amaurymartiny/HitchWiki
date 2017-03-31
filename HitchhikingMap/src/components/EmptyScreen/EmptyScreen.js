import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';

import theme from '../../services/ThemeService';

const EmptyScreen = ({ title }) => (
  <View style={styles.center}>
    <Icon type="ionicon" name="ios-bulb-outline" color="#777" size={84} />
    <Text style={{ color: '#777', textAlign: 'center' }}>{title}</Text>
  </View>
);

EmptyScreen.propTypes = {
  title: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: theme.iosBackgroundGrey,
  },
});


export default EmptyScreen;
