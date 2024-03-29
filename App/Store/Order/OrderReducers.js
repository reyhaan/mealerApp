import { orderActions } from './OrderActions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case orderActions.GET_ORDERS_SUCCESSFUL:
      return action.data;
    case orderActions.showActivityIndicator:
      return Object.assign({}, state, {
        showActivityIndicator: action.data,
      });
    default:
      return state;
  }
};
