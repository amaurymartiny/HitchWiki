import { connect } from 'react-redux';
import SpotDetailsView from './SpotDetailsView';

const mapStateToProps = state => state.spotDetails;

export default connect(mapStateToProps)(SpotDetailsView);
