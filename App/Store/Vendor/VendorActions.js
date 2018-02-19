import { takeLatest } from 'redux-saga/effects';
import VendorSaga from './VendorSaga';


/** ***************************** ACTIONS ************************************ */
export const vendorActions = {
  FETCH_VENDOR_MENU: 'FETCH_VENDOR_MENU',
  FETCH_MENU_SUCCESSFUL: 'FETCH_MENU_SUCCESSFUL',
  CREATE_MENU: 'CREATE_MENU',
  UPDATE_MENU: 'UPDATE_MENU',
  REMOVE_MENU: 'REMOVE_MENU',
  UPDATE_RATING: 'UPDATE_RATING',
  FETCH_MERCHANT_ORDERS: 'FETCH_MERCHANT_ORDERS',
  UPDATE_MERCHANT_ORDERS: 'UPDATE_MERCHANT_ORDERS',
  FETCH_VENDORS: 'FETCH_VENDORS',
  UPDATE_VENDORS: 'UPDATE_VENDORS',
  GET_SELECTED_VENDOR: 'GET_SELECTED_VENDOR',
  SET_NEW_VENDOR_ORDERS: 'SET_NEW_VENDOR_ORDERS',
  SET_ACCEPTED_VENDOR_ORDERS: 'SET_ACCEPTED_VENDOR_ORDERS',
  SET_DELIVERED_VENDOR_ORDERS: 'SET_DELIVERED_VENDOR_ORDERS',
  SET_CANCELLED_VENDOR_ORDERS: 'SET_CANCELLED_VENDOR_ORDERS',
  SET_SELECTED_VENDOR: 'SET_SELECTED_VENDOR',
  SHOW_ACTIVITY_INDICATOR: 'SHOW_ACTIVITY_INDICATOR',
};

/** ***************************** ACTION CREATORS ************************************ */
function createAction(type, data) {
  return { type, data };
}

export const vendorActionCreators = {
  fetchVendorMenu: data => createAction(vendorActions.FETCH_VENDOR_MENU, data),
  fetchMenuSuccessful: data => createAction(vendorActions.FETCH_MENU_SUCCESSFUL, data),
  createMenu: data => createAction(vendorActions.CREATE_MENU, data),
  updateMenu: data => createAction(vendorActions.UPDATE_MENU, data),
  removeMenu: data => createAction(vendorActions.REMOVE_MENU, data),
  showActivityIndicator: data => createAction(vendorActions.SHOW_ACTIVITY_INDICATOR, data),
  updateRating: data => createAction(vendorActions.UPDATE_RATING, data),
  fetchVendorOrders: () => createAction(vendorActions.FETCH_MERCHANT_ORDERS),
  updateMerchantOrders: data => createAction(vendorActions.UPDATE_MERCHANT_ORDERS, data),
  fetchVendors: () => createAction(vendorActions.FETCH_VENDORS),
  updateVendors: data => createAction(vendorActions.UPDATE_VENDORS, data),
  getSelectedVendor: data => createAction(vendorActions.GET_SELECTED_VENDOR, data),
  setSelectedVendor: data => createAction(vendorActions.SET_SELECTED_VENDOR, data),
  setNewVendorOrders: data => createAction(vendorActions.SET_NEW_VENDOR_ORDERS, data),
  setAcceptedVendorOrders: data => createAction(vendorActions.SET_ACCEPTED_VENDOR_ORDERS, data),
  setDeliveredVendorOrders: data => createAction(vendorActions.SET_DELIVERED_VENDOR_ORDERS, data),
  setRejectedVendorOrders: data => createAction(vendorActions.SET_CANCELLED_VENDOR_ORDERS, data),
};

/** ***************************** ACTION WATCHERS ************************************ */
const vendorSaga = new VendorSaga();
export const vendorActionWatchers = [
  takeLatest(vendorActions.FETCH_VENDOR_MENU, vendorSaga.fetchVendorMenu),
  takeLatest(vendorActions.CREATE_MENU, vendorSaga.createMenu),
  takeLatest(vendorActions.UPDATE_MENU, vendorSaga.updateMenu),
  takeLatest(vendorActions.REMOVE_MENU, vendorSaga.removeMenu),
  takeLatest(vendorActions.UPDATE_RATING, vendorSaga.updateRating),
  takeLatest(vendorActions.FETCH_MERCHANT_ORDERS, vendorSaga.fetchVendorOrders),
  takeLatest(vendorActions.FETCH_VENDORS, vendorSaga.fetchVendors),
  takeLatest(vendorActions.GET_SELECTED_VENDOR, vendorSaga.getSelectedVendor),
];
