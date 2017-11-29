import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import merchantService from '../../Services/menu-service';
import authentication from '../../Services/authentication-service';
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
        yield put(merchantActionCreators.showActivityIndicator(true));
        const user = yield call(authentication.currentUser);
        yield call(merchantService.createMenu, user.uid, menu.data);
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
        yield put(merchantActionCreators.showActivityIndicator(true));
        const user = yield call(authentication.currentUser);
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