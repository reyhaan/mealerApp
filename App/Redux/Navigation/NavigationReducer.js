import AppNavigation from '../../Navigation/Navigation'

export default (state, action) => {
    const newState = AppNavigation.router.getStateForAction(action, state);
    return newState || state
};


