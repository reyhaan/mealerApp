import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import merchantService from '../../Services/merchant-service';
import authentication from '../../Services/authentication-service';
import {merchantActionCreators} from './MerchantActions'

const menuEffects = {};

menuEffects.fetchMerchantMenu = function* () {
    try {
        const user = yield call(authentication.currentUser);
        const menus = yield call(merchantService.getMenu, user.uid);
        yield put(merchantActionCreators.fetchMenuSuccessful(menus))
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

menuEffects.createMenu = function* (menu) {
    try {
        const user = yield call(authentication.currentUser);
        yield call(merchantService.createMenu, user.uid, menu.data);
        yield put(merchantActionCreators.fetchMerchantMenu());
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
};

menuEffects.updateMenu = function* (menu) {
    try {
        const user = yield call(authentication.currentUser);
        yield call(merchantService.updateMenu, user.uid, menu.data);
        yield put(merchantActionCreators.fetchMerchantMenu());
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
};

menuEffects.removeMenu = function* (menu) {
    try {
        const user = yield call(authentication.currentUser);
        yield call(merchantService.removeMenu, user.uid, menu.data);
        yield put(merchantActionCreators.fetchMerchantMenu());
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
};

export default menuEffects;