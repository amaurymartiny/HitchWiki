import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

import { fetchOfflineSpots } from './OfflineSpotsState';
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
    this.props.dispatch(fetchOfflineSpots());
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.fullScreen}>
        {this.props.spots.length ?
          <View>
            {this.props.spots.map((spot, index) => (
              <ListItem
                key={index}
                title={`Spot #${index + 1}`}
                titleStyle={theme.styles.textColor}
                leftIcon={{ type: 'ionicon', name: 'ios-pin', color: theme.darkGrey }}
                onPress={() => this.props.navigation.navigate('spotDetailsSettings', { spotId: spot })}
              />
            ))}
          </View>
        :
          <EmptyScreen title="No offline spots saved. Hint: go to the Map,  click on a spot to see its description, and click on the 'Save Offline' button to save a spot" />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

export default OfflineSpotsView;
