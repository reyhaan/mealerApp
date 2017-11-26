import {takeLatest} from 'redux-saga/effects';
import CustomerSaga from './CustomerSaga';


/******************************* ACTIONS *************************************/
export const customerActions = {
    FETCH_COOKS : 'FETCH_COOKS'
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const customerActionCreators = {
    fetchCooks: ()=> createAction(merchantActions.FETCH_COOKS),
};

/******************************* SAGA WATCHERS *************************************/
export const customerActionWatchers = [
    takeLatest(merchantActions.FETCH_COOKS, MerchantSaga.fetchCooks)
];