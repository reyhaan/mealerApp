import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import merchantService from '../../Services/merchant-service';
import {menuCreators } from './MenuActions'

const menuEffects = {};

menuEffects.getFoodMenu = function* (){
    try{
        const menu = yield call(merchantService.getMenu);
        yield put(menuCreators.fetchMenuSuccessful(menu))
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {

    }
};

export default menuEffects;