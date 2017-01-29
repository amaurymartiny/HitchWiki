import { connect } from 'react-redux';
import HitchhikingMapView from './HitchhikingMapView';

const mapStateToProps = state => ({
  annotations: state.hitchhikingMap.annotations,
});

export default connect(mapStateToProps)(HitchhikingMapView);
