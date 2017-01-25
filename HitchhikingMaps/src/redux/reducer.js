import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop';
import HitchhikingMapStateReducer from '../modules/HitchhikingMap/HitchhikingMapState';
import CounterStateReducer from '../modules/counter/CounterState';
import SessionStateReducer, {RESET_STATE} from '../modules/Session/SessionState';

const reducers = {
  // Counter sample app state. This can be removed in a live application
  counter: CounterStateReducer,
  hitchhikingMap: HitchhikingMapStateReducer,

  session: SessionStateReducer

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
