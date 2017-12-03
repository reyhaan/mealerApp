import {takeLatest} from 'redux-saga/effects';
import CartSaga from './CartSaga';


/******************************* ACTIONS *************************************/
export const cartActions = {
    ADD_TO_CART: "ADD_TO_CART",
    ADD_TO_CART_SUCCESSFUL: "ADD_TO_CART_SUCCESSFUL"
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const cartActionCreators = {
    addToCart: (data)=> createAction(cartActions.ADD_TO_CART, data),
    addToCartSuccessful: (data)=> createAction(cartActions.ADD_TO_CART_SUCCESSFUL, data)
};

/******************************* SAGA WATCHERS *************************************/
export const cartActionWatchers = [
  takeLatest(cartActions.ADD_TO_CART, CartSaga.addToCart)
];