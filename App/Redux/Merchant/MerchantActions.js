import {takeLatest} from 'redux-saga/effects';
import MerchantSaga from './MerchantSaga';


/******************************* ACTIONS *************************************/
export const merchantActions = {
    FETCH_MERCHANT_MENU : 'MERCHANT_MENU',
    FETCH_MENU_SUCCESSFUL : 'FETCH_MENU_SUCCESSFUL',
    CREATE_MENU : "CREATE_MENU",
    UPDATE_MENU : "UPDATE_MENU",
    REMOVE_MENU : "REMOVE_MENU",
    SHOW_ACTIVITY_INDICATOR: 'SHOW_ACTIVITY_INDICATOR',
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const merchantActionCreators = {
    fetchMerchantMenu: (data)=> createAction(merchantActions.FETCH_MERCHANT_MENU, data),
    fetchMenuSuccessful: (data)=> createAction(merchantActions.FETCH_MENU_SUCCESSFUL, data),
    createMenu: (data)=> createAction(merchantActions.CREATE_MENU, data),
    updateMenu: (data)=> createAction(merchantActions.UPDATE_MENU, data),
    removeMenu: (data)=> createAction(merchantActions.REMOVE_MENU, data),
    showActivityIndicator: (data)=> createAction(merchantActions.SHOW_ACTIVITY_INDICATOR, data),
};

/******************************* SAGA WATCHERS *************************************/
export const merchantActionWatchers = [
    takeLatest(merchantActions.FETCH_MERCHANT_MENU, MerchantSaga.fetchMerchantMenu),
    takeLatest(merchantActions.CREATE_MENU, MerchantSaga.createMenu),
    takeLatest(merchantActions.UPDATE_MENU, MerchantSaga.updateMenu),
    takeLatest(merchantActions.REMOVE_MENU, MerchantSaga.removeMenu)
];