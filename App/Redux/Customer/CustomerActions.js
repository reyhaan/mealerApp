import {takeLatest} from 'redux-saga/effects';
import CustomerSaga from './CustomerSaga';


/******************************* ACTIONS *************************************/
export const customerActions = {
    FETCH_COOKS : 'FETCH_COOKS',
    FETCH_COOKS_SUCCESSFUL: 'FETCH_COOKS_SUCCESSFUL'
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const customerActionCreators = {
    fetchCooks: ()=> createAction(customerActions.FETCH_COOKS),
    fetchCooksSuccessful: (data) => createAction(customerActions.FETCH_COOKS_SUCCESSFUL, data)
};

/******************************* SAGA WATCHERS *************************************/
export const customerActionWatchers = [
    takeLatest(customerActions.FETCH_COOKS, CustomerSaga.fetchCooks)
];