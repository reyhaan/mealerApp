import {put, call} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import {authActionCreators} from '../Auth/AuthActions';
import foodMenuQueries from '../../Services/menu-service';
import {menuCreators } from './MenuActions'

const menuEffects = {};

menuEffects.getFoodMenu = function* (){
    //searchTerm is for when we add a search btn to get menus for a particular food
    try{
        const menu = yield call(foodMenuQueries.getAllFoodMenu);
        yield put(menuCreators.fetchMenuSuccessful(menu))
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {

    }
}

export default menuEffects;