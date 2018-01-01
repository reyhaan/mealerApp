import {takeLatest} from 'redux-saga/effects';
import VendorSaga from './VendorSaga';


/******************************* ACTIONS *************************************/
export const vendorActions = {
    FETCH_VENDORS : 'FETCH_VENDORS',
    UPDATE_VENDORS: 'UPDATE_VENDORS',
    SHOW_ACTIVITY_INDICATOR: 'SHOW_ACTIVITY_INDICATOR'
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const vendorActionCreators = {
    fetchVendors: ()=> createAction(vendorActions.FETCH_VENDORS),
    updateVendors: (data) => createAction(vendorActions.UPDATE_VENDORS, data),
    showActivityIndicator: (data) => createAction(vendorActions.SHOW_ACTIVITY_INDICATOR, data)
};

/******************************* SAGA WATCHERS *************************************/
export const customerActionWatchers = [
    takeLatest(vendorActions.FETCH_VENDORS, VendorSaga.fetchVendors)
];