import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem, Text, Button } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import Modal from 'react-native-modalbox';
import prettysize from 'prettysize';

import Mapbox from '../../services/Mapbox';
import { fetchOfflineMaps, saveOfflineMapProgress, deleteOfflineMap } from './OfflineMapsState';
import theme from '../../services/ThemeService';

class OfflineMapsView extends React.Component {

  static route = {
    navigationBar: {
      visible: true,
      title: 'Offline Maps',
    },
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(fetchOfflineMaps());
    // didn't find a way to do this inside saga
    this._offlineProgressSubscription = Mapbox.addOfflinePackProgressListener(progress => {
      this.props.dispatch(saveOfflineMapProgress(progress));
    });
  }

  componentWillUnmount() {
    this._offlineProgressSubscription.remove();
  }

  render() {
    return (
      <View style={styles.fullScreen}>
        <List>
          {this.props.packs.map((pack, index) => (
            <ListItem
              key={index}
              leftIcon={{ type: 'ionicon', name: 'ios-map'}}
              title={pack.name}
              subtitle={
                (pack.countOfResourcesCompleted < pack.countOfResourcesExpected && this.props.progress) ?
                  (this.props.progress.countOfResourcesCompleted < this.props.progress.countOfResourcesExpected) ?
                    <ProgressBar
                      indeterminate={!this.props.progress.countOfResourcesCompleted}
                      progress={this.props.progress.countOfResourcesCompleted / this.props.progress.countOfResourcesExpected}
                      width={200}
                    />
                  :
                    <Text>{prettysize(this.props.progress.countOfBytesCompleted)}</Text>
                :
                  <Text>{prettysize(pack.countOfBytesCompleted)}, {pack.metadata.annotations.length} spots saved.</Text>
              }
              onPress={this.refs.deletePackModal.open}
            />
          ))}
        </List>
        <Modal ref={'deletePackModal'} style={styles.modal} position="bottom">
          <View style={styles.deleteButton}>
            <Button
              icon={{type: 'ionicon', name: 'ios-trash'}}
              backgroundColor={theme.red}
              title="Delete Offline Map"
              raised={true}
              onPress={() => this.props.dispatch(deleteOfflineMap("pack.name"))}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1
  },
  modal: {
    height: 66
  },
  deleteButton: {
    marginTop: 10
  }
});

export default OfflineMapsView;
