import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import vendorService from '../../Services/vendor-service';
import {vendorActionCreators} from './VendorActions'

const customerEffects = {};

customerEffects.fetchVendors = function* () {
    try {
        const vendors = yield call(vendorService.fetchVendors);
        yield put(vendorActionCreators.showActivityIndicator(true));
        yield put(vendorActionCreators.updateVendors(vendors));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(vendorActionCreators.showActivityIndicator(false));
    }
};

export default customerEffects;