import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, ListItem, Text, Button } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons';
import prettysize from 'prettysize';

import Mapbox from '../../services/Mapbox';
import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';
import { fetchOfflineMaps, saveOfflineMapProgress, deleteOfflineMap, showDeletingPackModal, hideDeletingPackModal } from './OfflineMapsState';
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
        {this.props.packs.length === 0 ?
          <EmptyScreen title={<Text>No offline map saved. Hint: go to the Map and click on the  <Icon name="ios-cloud-download" size={24} type="ionicon" />  button to save maps.</Text>} />
        :
          <List>
            {this.props.packs.map((pack, index) => (
              <ListItem
                key={index}
                leftIcon={{ type: 'ionicon', name: 'ios-map'}}
                rightIcon={{ type: 'ionicon', name: 'ios-close-circle-outline', color: theme.red }}
                hideChevron={!(pack.countOfResourcesCompleted < pack.countOfResourcesExpected && this.props.progress && this.props.progress.countOfResourcesCompleted < this.props.progress.countOfResourcesExpected)}
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
                      <Text>{prettysize(this.props.progress.countOfBytesCompleted)}, {pack.metadata.annotations.length} spots saved.</Text>
                  :
                    <Text>{prettysize(pack.countOfBytesCompleted)}, {pack.metadata.annotations.length} spots saved.</Text>
                }
                onPress={() => {
                  // if it's still progressing, clicking on it means cancel
                  if (pack.countOfResourcesCompleted < pack.countOfResourcesExpected && this.props.progress && this.props.progress.countOfResourcesCompleted < this.props.progress.countOfResourcesExpected)
                    this.props.dispatch(deleteOfflineMap(pack.name));
                  else
                    this.props.dispatch(showDeletingPackModal(pack.name));
                }}
              />
            ))}
          </List>
        }
        <Modal
          isOpen={!!this.props.deletingPack}
          ref={'deletePackModal'}
          style={styles.modal}
          position="bottom"
          onClosed={() => this.props.dispatch(hideDeletingPackModal())}
        >
          <View style={styles.deleteButton}>
            <Button
              icon={{type: 'ionicon', name: 'ios-trash'}}
              backgroundColor={theme.red}
              title="Delete Offline Map"
              raised={true}
              onPress={() => {
                this.props.dispatch(hideDeletingPackModal());
                this.props.dispatch(deleteOfflineMap(this.props.deletingPack));
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  modal: {
    height: 66
  },
  deleteButton: {
    marginTop: 10
  }
});

export default OfflineMapsView;
