import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

import theme from '../../services/ThemeService';

class TabBar extends React.Component {
  static navigationOptions = {
    title: 'About'
  }

  render() {
    return (
      <Card>
        <Text>Made with &hearts; by Amaury Martiny (development) and Weronika Pawelec (design).</Text>
        <Text> </Text>
        <Text>Special thanks to all the people that gave us a ride when we were hitchhiking, you are the the reason we loved hitchhiking and decided to build this app.</Text>
        <Button
          buttonStyle={styles.button}
          backgroundColor={theme.blue}
          icon={{ type:'ionicon', name: 'ios-star' }}
          title='Rate this app on the App Store'
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  about: {
    flex: 1,
    padding: 10
  },
  button: {
    marginTop: 20
  }
});


export default TabBar;
