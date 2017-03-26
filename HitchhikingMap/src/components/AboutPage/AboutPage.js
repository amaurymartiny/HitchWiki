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
          </View>
          <Text style={styles.description}>Made with &hearts; by Amaury Martiny (development)
          and Weronika Pawelec (design).</Text>
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
    width: 128,
    height: 128,
    marginBottom: 20,
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default TabBar;
