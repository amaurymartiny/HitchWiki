// Hack to prevent multiple instances of screen in StackNavigator
// https://github.com/react-community/react-navigation/issues/271

import AppNavigator from '../../AppNavigator';

export default function routerReducer(state, action) {
  if (action.type.startsWith('Navigation/')) {
    const { type, routeName } = action
    const lastRoute = state.routes[state.routes.length - 1]
    if (type == lastRoute.type && routeName == lastRoute.routeName) return state
  }
  return AppNavigator.router.getStateForAction(action, state)
}
