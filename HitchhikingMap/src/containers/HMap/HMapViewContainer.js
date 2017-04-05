import { connect } from 'react-redux';
import HMapView from './HMapView';

const mapStateToProps = state => ({
  ...state.hMap,
  appLoaded: state.app.appLoaded,
  showTutorial: state.app.showTutorial,
});

export default connect(mapStateToProps)(HMapView);
