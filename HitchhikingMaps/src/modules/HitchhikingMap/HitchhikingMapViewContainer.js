import { connect } from 'react-redux';
import HitchhikingMapView from './HitchhikingMapView';

const mapStateToProps = state => ({
  HitchhikingMapState: state.get('hitchhikingMap').toJS(),
});

export default connect(mapStateToProps)(HitchhikingMapView);
