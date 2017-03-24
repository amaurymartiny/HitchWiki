import { connect } from 'react-redux';
import SpotDetailsView from './SpotDetailsView';

const mapStateToProps = state => ({
  ...state.spotDetails,
  offlineSpots: state.offlineSpots.spots
});

export default connect(mapStateToProps)(SpotDetailsView);
