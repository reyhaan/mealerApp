import {takeLatest} from 'redux-saga/effects';
import CartSaga from '../Sagas/CartSaga';

/******************************* ACTIONS *************************************/
export const cartActions = {
    ADD_TO_CART: "ADD_TO_CART",
    ADD_TO_CART_SUCCESSFUL: "ADD_TO_CART_SUCCESSFUL",
    HIDE_ADD_TO_CART_MODAL: "HIDE_ADD_TO_CART_MODAL",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    UPDATE_ITEM_COUNT: "UPDATE_ITEM_COUNT",
    UPDATE_CART: "UPDATE_CART",
    DO_CHECKOUT: "DO_CHECKOUT",
    GET_USER_CART: "GET_USER_CART",
    UPDATE_USER_CART: "UPDATE_USER_CART",
    showActivityIndicator: 'showActivityIndicator',
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const cartActionCreators = {
    addToCart: (data)=> createAction(cartActions.ADD_TO_CART, data),
    hideAddToCartModal: (data)=> createAction(cartActions.HIDE_ADD_TO_CART_MODAL, data),
    removeItemFromCart: (data) => createAction(cartActions.REMOVE_FROM_CART, data),
    updateItemCount: (data) => createAction(cartActions.UPDATE_ITEM_COUNT, data),
    updateCart: (data) => createAction(cartActions.UPDATE_CART, data),
    checkout: (data) => createAction(cartActions.DO_CHECKOUT, data),
    getCart: () => createAction(cartActions.GET_USER_CART),
    showActivityIndicator: (data) => createAction(cartActions.showActivityIndicator, data)
};

/******************************* SAGA WATCHERS *************************************/
const cart = new CartSaga();
export const cartActionWatchers = [
  takeLatest(cartActions.ADD_TO_CART, cart.addToCart),
  takeLatest(cartActions.REMOVE_FROM_CART, cart.removeItemFromCart),
  takeLatest(cartActions.UPDATE_ITEM_COUNT, cart.updateItemCount),
  takeLatest(cartActions.DO_CHECKOUT, cart.checkout),
  takeLatest(cartActions.GET_USER_CART, cart.getUserCart)
];