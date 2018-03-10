import { takeLatest } from 'redux-saga/effects';
import CartSaga from './CartSaga';

/** ***************************** ACTIONS ************************************ */
export const cartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  ADD_TO_CART_SUCCESSFUL: 'ADD_TO_CART_SUCCESSFUL',
  HIDE_ADD_TO_CART_MODAL: 'HIDE_ADD_TO_CART_MODAL',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_ITEM_COUNT: 'UPDATE_ITEM_COUNT',
  UPDATE_CART: 'UPDATE_CART',
  DO_CHECKOUT: 'DO_CHECKOUT',
  GET_USER_CART: 'GET_USER_CART',
  UPDATE_USER_CART: 'UPDATE_USER_CART',
  SET_ORDER_DELIVERY_MODE: 'SET_ORDER_DELIVERY_MODE',
  showActivityIndicator: 'showActivityIndicator',
};

/** ***************************** ACTION CREATORS ************************************ */
function createAction(type, data) {
  return { type, data };
}
export const cartActionCreators = {
  addToCart: data => createAction(cartActions.ADD_TO_CART, data),
  hideAddToCartModal: data => createAction(cartActions.HIDE_ADD_TO_CART_MODAL, data),
  removeItemFromCart: data => createAction(cartActions.REMOVE_FROM_CART, data),
  updateItemCount: data => createAction(cartActions.UPDATE_ITEM_COUNT, data),
  updateCart: data => createAction(cartActions.UPDATE_CART, data),
  checkout: data => createAction(cartActions.DO_CHECKOUT, data),
  getCart: () => createAction(cartActions.GET_USER_CART),
  setOrderDeliveryMode: data => createAction(cartActions.SET_ORDER_DELIVERY_MODE, data),
  showActivityIndicator: data => createAction(cartActions.showActivityIndicator, data),
};

/** ***************************** ACTION WATCHERS ************************************ */
export const cartActionWatchers = [
  takeLatest(cartActions.ADD_TO_CART, CartSaga.addToCart),
  takeLatest(cartActions.REMOVE_FROM_CART, CartSaga.removeItemFromCart),
  takeLatest(cartActions.UPDATE_ITEM_COUNT, CartSaga.updateItemCount),
  takeLatest(cartActions.DO_CHECKOUT, CartSaga.checkout),
  takeLatest(cartActions.GET_USER_CART, CartSaga.getUserCart),
  // takeLatest(cartActions.SET_ORDER_DELIVERY_MODE, CartSaga.getUserCart),
];
