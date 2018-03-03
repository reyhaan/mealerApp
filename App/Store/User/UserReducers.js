import { userActions } from './UserActions';

const initialState = {
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActions.SET_USER:
      return Object.assign({}, state, {
        currentUser: action.data,
      });
    case userActions.CLEAR_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: null,
      });
    default:
      return state;
  }
};
