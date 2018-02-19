import { requestActions } from './RequestActions';

const initialState = {
  showLoadingSpinner: false,
};

export default function request(state = initialState, action) {
  switch (action.type) {
    case requestActions.showLoadingSpinner:
      return Object.assign({}, state, {
        showLoadingSpinner: action.data,
      });
    default:
      return state;
  }
}
