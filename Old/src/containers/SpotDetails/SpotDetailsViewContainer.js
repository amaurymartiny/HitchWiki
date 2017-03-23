import { connect } from 'react-redux';
import SpotDetailsView from './SpotDetailsView';

const mapStateToProps = state => ({
  ...state.spotDetails,
  offlineSpot: state.offlineSpots.currentSpot
});

export default connect(mapStateToProps)(SpotDetailsView);
