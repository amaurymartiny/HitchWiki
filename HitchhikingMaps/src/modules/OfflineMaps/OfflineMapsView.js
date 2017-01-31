import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
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
      <List>
        {this.props.packs.map((pack, index) => (
          <ListItem
            key={index}
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
                <Text>{prettysize(pack.countOfBytesCompleted)}</Text>
            }
            rightIcon={{ name: 'delete' }}
            onPress={() => this.props.dispatch(deleteOfflineMap(pack.name))}
          />
        ))}
      </List>
    );
  }
}

export default OfflineMapsView;
