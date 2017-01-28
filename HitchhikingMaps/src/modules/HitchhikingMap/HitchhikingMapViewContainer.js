import { connect } from 'react-redux';
import HitchhikingMapView from './HitchhikingMapView';

const mapStateToProps = state => ({
  HitchhikingMapState: state.hitchhikingMap,
});

export default connect(mapStateToProps)(HitchhikingMapView);
