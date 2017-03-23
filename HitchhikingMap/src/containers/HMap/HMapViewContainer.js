import { connect } from 'react-redux';
import HMapView from './HMapView';

const mapStateToProps = state => ({
  ...state.hitchhikingMap
});

export default connect(mapStateToProps)(HMapView);
