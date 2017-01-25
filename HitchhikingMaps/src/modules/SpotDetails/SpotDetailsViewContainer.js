import { connect } from 'react-redux';
import SpotDetailsView from './SpotDetailsView';

const mapStateToProps = state => (
  state.get('spotDetails').toJS()
);

export default connect(mapStateToProps)(SpotDetailsView);
