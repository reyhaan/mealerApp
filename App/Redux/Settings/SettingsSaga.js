import {call, put} from 'redux-saga/effects'
import {Alert} from 'react-native';
import SettingsService from '../../Services/settings-service'
import { settingsActionCreators } from './SettingsActions'
import authenticationService from '../../Services/authentication-service'

const settingsEffects = {}; 

settingsEffects.updateUserInfo = function* (userDetails){
    try{
        const newUser = yield call(SettingsService.updateUserInfo, userDetails);
        yield put(settingsActionCreators.setUser(newUser));
    } catch (error) {
        Alert.alert('Error', error.message)
    } finally {

    }
};

settingsEffects.getUser = function* (data) {
    try{
        const currentUser = yield call(authenticationService.fetchUser, data.data.id)
        yield put(settingsActionCreators.setUser(currentUser))
    }
    catch(error){
        console.log('error occured while fetching user', error)
    }
}
export default settingsEffects;