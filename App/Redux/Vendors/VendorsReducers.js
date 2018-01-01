import {vendorActions} from './VendorActions';

const initialState = {
    vendors: [],
};

export function vendors(state = initialState, action) {
    switch (action.type) {
        case vendorActions.UPDATE_VENDORS:
            return Object.assign({}, state, {
                vendors: action.data,
            });
        case vendorActions.SHOW_ACTIVITY_INDICATOR:
            return Object.assign({}, state, {
                showActivityIndicator: action.data,
            });
        default:
            return state
    }
}