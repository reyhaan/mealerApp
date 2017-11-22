import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import merchantService from '../../Services/merchant-service';
import authentication from '../../Services/authentication-service';
import {menuCreators} from './MenuActions'

const menuEffects = {};

menuEffects.getFoodMenu = function* () {
    try {
        const user = yield call(authentication.currentUser)
        const menu = yield call(merchantService.getMenu, user.uid)
        yield put(menuCreators.fetchMenuSuccessful(menu))
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {

    }
};

menuEffects.createFoodMenu = function* (foodDetails) {
    try {
        const user = yield call(authentication.currentUser)
        if (user) {
            const menu = yield call(merchantService.createMenu, user.uid, foodDetails.data);
            yield put(menuCreators.createMenuSuccessful(menu))
        }
        else {
            yield put(menuCreators.createMenuFailure("Unable to create menu, you may not be logged in"))
        }
    }
    catch (error) {
        Alert.alert('Error', error.message)
    }
};

export default menuEffects;