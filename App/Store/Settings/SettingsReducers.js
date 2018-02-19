import { settingsActions } from './SettingsActions';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case settingsActions.UPDATE_USER_INFO:
      return Object.assign({}, state, {
        user: action.data,
      });
    case settingsActions.SET_CURRENT_USER:
      return Object.assign({}, state, {
        user: action.data,
      });
    case settingsActions.CLEAR_CURRENT_USER:
      return Object.assign({}, state, {
        user: null,
      });
    default:
      return state;
  }
};
