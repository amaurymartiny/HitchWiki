import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';
import theme from '../../services/ThemeService';

class OfflineSpotsView extends React.Component {

  static navigationOptions = {
    title: 'Offline Spots',
  }

  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
    spots: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        {Object.keys(this.props.spots).length ?
          <ScrollView style={{ backgroundColor: 'white' }}>
            {Object.keys(this.props.spots)
              .sort((a, b) => {return (new Date(this.props.spots[a].metadata.dateAdded)) - (new Date(this.props.spots[b].metadata.dateAdded))})
              .map((spotId, index) => (
                <ListItem
                  key={spotId}
                  title={`Spot #${index + 1}`}
                  titleStyle={theme.styles.textColor}
                  leftIcon={{ type: 'ionicon', name: 'ios-pin', color: theme.darkGrey }}
                  onPress={() => this.props.navigation.navigate('spotDetailsSettings', { spotId })}
                />
            ))}
          </ScrollView>
        :
          <EmptyScreen title="No offline spots saved. Hint: go to the Map,  click on a spot to see its description, and click on the 'Save Offline' button to save a spot." />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default OfflineSpotsView;
