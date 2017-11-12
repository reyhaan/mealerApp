import {put, call} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import {authActionCreators} from '../Auth/AuthRedux';
import foodMenuQueries from '../Services/authentication-service'

export function getFoodMenu(searchTerm=""){
    //searchTerm is for when we add a search btn to get menus for a particular food
    try{
        yield put(authActionCreators.showActivityIndicator(true));
        const menu = yield call(foodMenuQueries.getAllFoodMenu);
        console.log(menu);
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(authActionCreators.showActivityIndicator(false));
    }
}