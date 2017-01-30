import React, { PropTypes } from 'react';
import { List, ListItem } from 'react-native-elements';
import prettysize from 'prettysize';

import { fetchOfflineMaps } from './OfflineMapsState';

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
          />
        ))}
      </List>
    );
  }
}

export default OfflineMapsView;
