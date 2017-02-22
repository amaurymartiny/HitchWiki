import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';

import { SnapshotsActions } from '../../ducks/Snapshots';
import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';
import theme from '../../services/ThemeService';

class OfflinesnapshotsView extends React.Component {

  static navigationOptions = {
    title: 'Snapshots'
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(SnapshotsActions.fetchSnapshots());
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.fullScreen}>
        {this.props.snapshots.length ?
          <View>
            {this.props.snapshots.map((snapshotUri, index) => (
              <ListItem
                key={index}
                title={snapshotUri}
                titleStyle={theme.styles.textColor}
                leftIcon={{ type: 'ionicon', name: 'ios-pin', color: theme.darkGrey }}
              />
            ))}
          </View>
        :
          <EmptyScreen title="No snapshots saved. Hint: go to the Map, click on the '+' button, and take a snapshot to see it here." />
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

export default OfflinesnapshotsView;
