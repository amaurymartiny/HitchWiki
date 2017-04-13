import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
// import Gallery from 'react-native-gallery';
import Gallery from 'react-native-image-zoom-viewer';
import moment from 'moment';

import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';

class OfflinesnapshotsView extends React.Component {

  static navigationOptions = {
    title: 'Snapshots',
  }

  static propTypes = {
    snapshots: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        {this.props.snapshots.length ?
          <View style={styles.fullScreen}>
            <Gallery
              style={{ flex: 1 }}
              saveToLocalByLongPress={false}
              imageUrls={this.props.snapshots.map((item) => {
                const newItem = { url: item.uri };
                return newItem;
              })}
              renderIndicator={(currentIndex, allSize) => <Text style={styles.caption}>{moment(this.props.snapshots[currentIndex - 1].date).calendar()} ({currentIndex}/{allSize})</Text>}
            />

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
