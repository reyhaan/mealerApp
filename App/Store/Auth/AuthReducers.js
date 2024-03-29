import { authActions } from './AuthActions';

const initialState = {
  showResetPasswordModal: false,
  resetPasswordError: '',
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.showActivityIndicator:
      return Object.assign({}, state, {
        showActivityIndicator: action.data,
      });
    case authActions.showResetPasswordModal:
      return Object.assign({}, state, {
        showResetPasswordModal: action.data,
      });
    case authActions.setResetPasswordError:
      return Object.assign({}, state, {
        resetPasswordError: action.data,
      });
    default:
      return state;
  }
};
