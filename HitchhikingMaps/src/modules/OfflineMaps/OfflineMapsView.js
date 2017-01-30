import React, { PropTypes } from 'react';
import { List, ListItem } from 'react-native-elements';
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
            subtitle={prettysize(pack.countOfBytesCompleted)}
            rightIcon={{ name: 'delete' }}
            onPress={() => this.props.dispatch(deleteOfflineMap(pack.name))}
          />
        ))}
      </List>
    );
  }
}

export default OfflineMapsView;
