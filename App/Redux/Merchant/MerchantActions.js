import {takeLatest} from 'redux-saga/effects';
import MerchantSaga from './MerchantSaga';


/******************************* ACTIONS *************************************/
export const merchantActions = {
    FETCH_MERCHANT_MENU : 'MERCHANT_MENU',
    FETCH_MENU_SUCCESSFUL : 'FETCH_MENU_SUCCESSFUL',
    CREATE_MENU : "CREATE_MENU",
    CREATE_MENU_SUCCESSFUL : "CREATE_MENU_SUCCESSFUL",
    CREATE_MENU_FAILURE: "CREATE_MENU_FAILURE"
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const merchantActionCreators = {
    fetchMerchantMenu: ()=> createAction(merchantActions.FETCH_MERCHANT_MENU),
    fetchMenuSuccessful: (data)=> createAction(merchantActions.FETCH_MENU_SUCCESSFUL, data),
    createMenu: (data)=> createAction(merchantActions.CREATE_MENU, data),
    createMenuSuccessful: (data)=> createAction(merchantActions.CREATE_MENU_SUCCESSFUL, data),
    createMenuFailure: (error) => createAction(merchantActions.CREATE_MENU_FAILURE, error)
};

/******************************* SAGA WATCHERS *************************************/
export const merchantActionWatchers = [
    takeLatest(merchantActions.FETCH_MERCHANT_MENU, MerchantSaga.fetchMerchantMenu),
    takeLatest(merchantActions.CREATE_MENU, MerchantSaga.createMenu)
];