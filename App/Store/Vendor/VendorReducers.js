import { vendorActions } from './VendorActions';

const initialState = {
  menus: [],
  orders: [],
  selectedVendor: {},
  newVendorOrders: [],
  acceptedVendorOrders: [],
  deliveredVendorOrders: [],
  cancelledVendorOrders: [],
};

export function vendors(state = [], action) {
  switch (action.type) {
    case vendorActions.UPDATE_VENDORS:
      return action.data;
    default:
      return state;
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case vendorActions.FETCH_VENDORS_PENDING:
      return Object.assign({}, state, {
        fetchVendorsPending: action.data,
      });
    case vendorActions.FETCH_VENDORS_ORDERS_PENDING:
      return Object.assign({}, state, {
        fetchVendorsOrdersPending: action.data,
      });
    case vendorActions.FETCH_MENU_SUCCESSFUL:
      return Object.assign({}, state, {
        menus: action.data,
      });
    case vendorActions.SHOW_ACTIVITY_INDICATOR:
      return Object.assign({}, state, {
        showActivityIndicator: action.data,
      });
    case vendorActions.UPDATE_VENDOR_ORDERS:
      return Object.assign({}, state, {
        orders: action.data,
      });
    case vendorActions.SET_SELECTED_VENDOR:
      return Object.assign({}, state, {
        selectedVendor: action.data,
      });
    case vendorActions.SET_NEW_VENDOR_ORDERS:
      return Object.assign({}, state, {
        newVendorOrders: action.data,
      });
    case vendorActions.SET_ACCEPTED_VENDOR_ORDERS:
      return Object.assign({}, state, {
        acceptedVendorOrders: action.data,
      });
    case vendorActions.SET_DELIVERED_VENDOR_ORDERS:
      return Object.assign({}, state, {
        deliveredVendorOrders: action.data,
      });
    case vendorActions.SET_CANCELLED_VENDOR_ORDERS:
      return Object.assign({}, state, {
        cancelledVendorOrders: action.data,
      });
    default:
      return state;
  }
};
