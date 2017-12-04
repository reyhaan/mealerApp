import {takeLatest} from 'redux-saga/effects';
import CartSaga from './CartSaga';


/******************************* ACTIONS *************************************/
export const cartActions = {
    ADD_TO_CART: "ADD_TO_CART",
    ADD_TO_CART_SUCCESSFUL: "ADD_TO_CART_SUCCESSFUL",
    HIDE_ADD_TO_CART_MODAL: "HIDE_ADD_TO_CART_MODAL",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    UPDATE_ITEM_COUNT: "UPDATE_ITEM_COUNT",
    CART_UPDATE_SUCCESSFUL: "CART_UPDATE_SUCCESSFUL"
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const cartActionCreators = {
    addToCart: (data)=> createAction(cartActions.ADD_TO_CART, data),
    addToCartSuccessful: (data)=> createAction(cartActions.ADD_TO_CART_SUCCESSFUL, data),
    hideAddToCartModal: (data)=> createAction(cartActions.HIDE_ADD_TO_CART_MODAL, data),
    removeFromCart: (data) => createAction(cartActions.REMOVE_FROM_CART, data),
    updateItemCount: (data) => createAction(cartActions.UPDATE_ITEM_COUNT, data),
    cartUpdateSuccessful: (data) => createAction(cartActions.CART_UPDATE_SUCCESSFUL, data)
};

/******************************* SAGA WATCHERS *************************************/
export const cartActionWatchers = [
  takeLatest(cartActions.ADD_TO_CART, CartSaga.addToCart),
  takeLatest(cartActions.REMOVE_FROM_CART, CartSaga.removeFromCart),
  takeLatest(cartActions.UPDATE_ITEM_COUNT, CartSaga.updateItemCount)
];