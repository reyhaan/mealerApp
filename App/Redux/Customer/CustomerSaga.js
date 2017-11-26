import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import customerService from '../../Services/customer-service';
import authentication from '../../Services/authentication-service';
import {customerActionCreators} from './CustomerActions'

const customerEffects = {};

customerEffects.fetchCooks = function* () {
    try {
        const user = yield call(authentication.currentUser);
        const menus = yield call(merchantService.getMenu, user.uid);
        yield put(merchantActionCreators.fetchMenuSuccessful(menus))
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

export default customerEffects;