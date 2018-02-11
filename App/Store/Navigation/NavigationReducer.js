import Navigation from '../../Navigation/Navigation'

export default (state, action) => {
    const newState = Navigation.router.getStateForAction(action, state);
    return newState || state
};