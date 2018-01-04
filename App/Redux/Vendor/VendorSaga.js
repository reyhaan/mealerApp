import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import menuService from '../../Services/menu-service';
import vendorService from '../../Services/vendor-service';
import orderService from '../../Services/order-service';
import authentication from '../../Services/authentication-service';
import imgService from '../../Services/image-service';
import {vendorActionCreators} from './VendorActions'

const vendorEffects = {};

vendorEffects.fetchVendorMenu = function* () {
    try {
        yield put(vendorActionCreators.showActivityIndicator(true));
        const user = yield call(authentication.currentUser);
        const menus = yield call(menuService.getMenu, user.uid);
        yield put(vendorActionCreators.fetchMenuSuccessful(menus))
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
    finally {
        yield put(vendorActionCreators.showActivityIndicator(false))
    }
};

vendorEffects.fetchVendors = function* () {
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

vendorEffects.createMenu = function* (menu) {
    try {
        const user = yield call(authentication.currentUser);
        let {data} = menu;
        if (data.base64img) {
            let imageUrlName = data.itemName + user.uid;
            data.itemImage = yield call(imgService.uploadBase64Image, imageUrlName, data.base64img);
        }
        delete data.base64img; // !important
        yield put(vendorActionCreators.showActivityIndicator(true));
        yield call(menuService.createMenu, user.uid, data);
        yield put(vendorActionCreators.fetchMerchantMenu(user.uid));
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(vendorActionCreators.showActivityIndicator(false))
    }
};

vendorEffects.updateMenu = function* (menu) {
    try {
        let {data} = menu;
        const user = yield call(authentication.currentUser);
        if (data.base64img) {
            let imageUrlName = data.itemName + user.uid;
            data.itemImage = yield call(imgService.uploadBase64Image, imageUrlName, data.base64img);
        }
        delete data.base64img; // !important
        yield put(vendorActionCreators.showActivityIndicator(true));
        yield call(menuService.updateMenu, user.uid, menu.data);
        yield put(vendorActionCreators.fetchMerchantMenu(user.uid));
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(vendorActionCreators.showActivityIndicator(false))
    }
};

vendorEffects.removeMenu = function* (menu) {
    try {
        yield put(vendorActionCreators.showActivityIndicator(true));
        const user = yield call(authentication.currentUser);
        yield call(menuService.removeMenu, user.uid, menu.data.id);
        yield put(vendorActionCreators.fetchMerchantMenu(user.uid));
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(vendorActionCreators.showActivityIndicator(false))
    }
};

vendorEffects.updateRating = function* (ratingData) {
    try {
        let {data} = ratingData;
        let merchantId = data.merchantId;
        let rating = data.rating;
        yield put(vendorActionCreators.showActivityIndicator(true));
        yield call(vendorService.updateRating, merchantId, rating);
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(vendorActionCreators.showActivityIndicator(false))
    }
};

vendorEffects.fetchVendorOrders = function* () {
    try {
        const user = yield call(authentication.currentUser);
        yield put(vendorActionCreators.showActivityIndicator(true));
        const orders = yield call(orderService.getMerchantOrders, user.uid);
        yield put(vendorActionCreators.updateMerchantOrders(orders))
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(vendorActionCreators.showActivityIndicator(false))
    }
};

export default vendorEffects;