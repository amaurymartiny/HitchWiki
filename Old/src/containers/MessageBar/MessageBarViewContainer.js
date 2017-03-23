import { connect } from 'react-redux';
import MessageBarView from './MessageBarView';

const mapStateToProps = state => state.messageBar;

export default connect(mapStateToProps)(MessageBarView);
