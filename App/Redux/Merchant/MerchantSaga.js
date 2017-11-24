import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import merchantService from '../../Services/merchant-service';
import authentication from '../../Services/authentication-service';
import {merchantActionCreators} from './MerchantActions'

const menuEffects = {};

menuEffects.fetchMerchantMenu = function* () {
    try {
        const user = yield call(authentication.currentUser);
        const menu = yield call(merchantService.getMenu, user.uid);
        yield put(merchantActionCreators.fetchMenuSuccessful(menu))
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {

    }
};

menuEffects.createMenu = function* (foodDetails) {
    try {
        const user = yield call(authentication.currentUser);
        if (user) {
            const menu = yield call(merchantService.createMenu, user.uid, foodDetails.data);
            yield put(merchantActionCreators.createMenuSuccessful(menu))
        }
        else {
            yield put(merchantActionCreators.createMenuFailure("Unable to create menu, you may not be logged in"))
        }
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
};

export default menuEffects;