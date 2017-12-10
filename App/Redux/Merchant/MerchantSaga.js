import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import merchantService from '../../Services/menu-service';
import authentication from '../../Services/authentication-service';
import imgService from '../../Services/image-service';
import {merchantActionCreators} from './MerchantActions'

const menuEffects = {};

menuEffects.fetchMerchantMenu = function* (merchant) {
    try {
        yield put(merchantActionCreators.showActivityIndicator(true));
        const menus = yield call(merchantService.getMenu, merchant.data);
        yield put(merchantActionCreators.fetchMenuSuccessful(menus))
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
    finally {
        yield put(merchantActionCreators.showActivityIndicator(false))
    }
};

menuEffects.createMenu = function* (menu) {
    try {
        const user = yield call(authentication.currentUser);
        let {data} = menu;
        if (data.base64img) {
            let imageUrlName = data.itemName + user.uid;
            data.itemImage = yield call(imgService.uploadBase64Image, imageUrlName, data.base64img);
        }
        delete data.base64img; // !important
        yield put(merchantActionCreators.showActivityIndicator(true));
        yield call(merchantService.createMenu, user.uid, data);
        yield put(merchantActionCreators.fetchMerchantMenu(user.uid));
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(merchantActionCreators.showActivityIndicator(false))
    }
};

menuEffects.updateMenu = function* (menu) {
    try {
        let {data} = menu;
        const user = yield call(authentication.currentUser);
        if (data.base64img) {
            let imageUrlName = data.itemName + user.uid;
            data.itemImage = yield call(imgService.uploadBase64Image, imageUrlName, data.base64img);
        }
        delete data.base64img; // !important
        yield put(merchantActionCreators.showActivityIndicator(true));
        yield call(merchantService.updateMenu, user.uid, menu.data);
        yield put(merchantActionCreators.fetchMerchantMenu(user.uid));
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(merchantActionCreators.showActivityIndicator(false))
    }
};

menuEffects.removeMenu = function* (menu) {
    try {
        yield put(merchantActionCreators.showActivityIndicator(true));
        const user = yield call(authentication.currentUser);
        yield call(merchantService.removeMenu, user.uid, menu.data.id);
        yield put(merchantActionCreators.fetchMerchantMenu(user.uid));
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
    finally {
        yield put(merchantActionCreators.showActivityIndicator(false))
    }
};

export default menuEffects;