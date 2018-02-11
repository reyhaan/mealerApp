import {takeLatest} from 'redux-saga/effects';
import CartSaga from './CartSaga';

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

/******************************* ACTION WATCHERS *************************************/
const cartSaga = new CartSaga();
export const cartActionWatchers = [
  takeLatest(cartActions.ADD_TO_CART, cartSaga.addToCart),
  takeLatest(cartActions.REMOVE_FROM_CART, cartSaga.removeItemFromCart),
  takeLatest(cartActions.UPDATE_ITEM_COUNT, cartSaga.updateItemCount),
  takeLatest(cartActions.DO_CHECKOUT, cartSaga.checkout),
  takeLatest(cartActions.GET_USER_CART, cartSaga.getUserCart)
];