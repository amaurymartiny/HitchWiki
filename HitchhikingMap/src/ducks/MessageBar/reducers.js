import types from './types';
import SnapshotsTypes from '../Snapshots/types'; // TODO not good here I think
import OfflineSpotsTypes from '../OfflineSpots/types';

const initialState = {
  message: '',
  shouldHideAfterDelay: true,
};
export default function OfflineSpotsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        shouldHideAfterDelay: action.payload.shouldHideAfterDelay,
      };
    case types.CLEAR_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case OfflineSpotsTypes.SAVE_OFFLINE_SPOT_SUCCESS:
      return {
        ...state,
        message: 'Spot saved successfully.'
      };
    default:
      return state;
  }
}
