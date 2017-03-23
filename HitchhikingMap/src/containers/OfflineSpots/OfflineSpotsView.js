import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

import { OfflineSpotsActions } from '../../ducks/OfflineSpots';

import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';
import theme from '../../services/ThemeService';

class OfflineSpotsView extends React.Component {

  static navigationOptions = {
    title: 'Offline Spots'
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(OfflineSpotsActions.fetchOfflineSpots());
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        {this.props.spots.length ?
          <ScrollView style={{ backgroundColor: 'white' }}>
            {this.props.spots.map((spot, index) => (
              <ListItem
                key={index}
                title={`Spot #${index + 1}`}
                titleStyle={theme.styles.textColor}
                leftIcon={{ type: 'ionicon', name: 'ios-pin', color: theme.darkGrey }}
                onPress={() => this.props.navigation.navigate('spotDetailsSettings', { spotId: spot })}
              />
            ))}
          </ScrollView>
        :
          <EmptyScreen title="No offline spots saved. Hint: go to the Map,  click on a spot to see its description, and click on the 'Save Offline' button to save a spot" />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default OfflineSpotsView;
