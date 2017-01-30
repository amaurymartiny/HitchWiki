import React, { PropTypes } from 'react';
import { List, ListItem } from 'react-native-elements';
import prettysize from 'prettysize';

import { fetchOfflineMaps, deleteOfflineMap } from './OfflineMapsState';
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
