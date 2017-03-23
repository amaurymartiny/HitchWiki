import { connect } from 'react-redux';
import HMapView from './HMapView';

const mapStateToProps = state => ({
  ...state.hMap
});

export default connect(mapStateToProps)(HMapView);
