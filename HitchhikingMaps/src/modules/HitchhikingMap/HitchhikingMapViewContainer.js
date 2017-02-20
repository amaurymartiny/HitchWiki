import { connect } from 'react-redux';
import HitchhikingMapView from './HitchhikingMapView';

const mapStateToProps = state => ({
  ...state.hitchhikingMap,
  progress: state.offlineMaps.progress,
  offlineAnnotations: state.offlineMaps.offlineAnnotations
});

export default connect(mapStateToProps)(HitchhikingMapView);
