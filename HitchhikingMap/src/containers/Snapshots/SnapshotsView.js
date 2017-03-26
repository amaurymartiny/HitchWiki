import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Gallery from 'react-native-gallery';
import moment from 'moment';

import { SnapshotsActions } from '../../ducks/Snapshots';

import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';

class OfflinesnapshotsView extends React.Component {

  static navigationOptions = {
    title: 'Snapshots',
  }

  static propTypes = {
    currentPage: React.PropTypes.number.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    snapshots: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        {this.props.snapshots.length ?
          <View style={styles.fullScreen}>
            <Gallery
              style={{ flex: 1 }}
              images={this.props.snapshots.map(item => item.uri)}
              onPageSelected={page => this.props.dispatch(SnapshotsActions.setPage(page))}
            />
            <Text style={styles.caption}>{moment(this.props.snapshots[this.props.currentPage].date).calendar()} ({this.props.currentPage + 1}/{this.props.snapshots.length})</Text>
          </View>
        :
          <EmptyScreen title="No snapshots taken yet. Hint: go to the Map, click on the 'Camera' button, and take a snapshot to see it here." />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
  },
  caption: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: 14,
    bottom: 40,
    padding: 10,
  },
});

export default OfflinesnapshotsView;
