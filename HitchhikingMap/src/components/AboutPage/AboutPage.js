/* eslint-disable global-require, import/no-unresolved */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-elements';

class TabBar extends React.Component {
  static navigationOptions = {
    title: 'About',
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <View style={styles.center}>
            <Image source={require('../../../assets/images/logo/ios/iTunesArtwork.png')} style={styles.logo} />
            <Image source={require('../../../assets/images/hitchwiki/logo.png')} style={styles.logo} />
          </View>
          <Text style={styles.description}>Made with &hearts; by Amaury Martiny (development)
          and Weronika Pawelec (design), with the help of the Hitchwiki team.</Text>
          <Text style={styles.description}>Special thanks to all the people that
          gave us a ride when we were hitchhiking, you are the the reason we loved hitchhiking
          and decided to build this app.</Text>
          {/* <Button
          buttonStyle={styles.button}
          backgroundColor={theme.blue}
          icon={{ type:'ionicon', name: 'ios-star' }}
          title='Rate this app on the App Store'
        />*/}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    textAlign: 'justify',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 20,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});


export default TabBar;
