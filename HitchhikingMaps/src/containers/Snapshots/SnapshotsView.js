import React, { PropTypes } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import Gallery from 'react-native-gallery';
import moment from 'moment';

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
    return (
      <View style={styles.fullScreen}>
        {this.props.snapshots.length ?
          <View style={styles.fullScreen}>
            <Gallery
              style={{flex: 1}}
              images={this.props.snapshots.map(item => item.uri)}
              onPageSelected={page => this.props.dispatch(SnapshotsActions.setPage(page))}
            />
            <Text style={styles.caption}>{moment(this.props.snapshots[this.props.currentPage].date).calendar()}</Text>
          </View>
        :
          <EmptyScreen title="No snapshots taken yet. Hint: go to the Map, click on the '+' button, and take a snapshot to see it here." />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  caption: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: 14,
    bottom: 40,
    padding: 10
  }
});

export default OfflinesnapshotsView;
