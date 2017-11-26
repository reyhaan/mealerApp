import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import customerService from '../../Services/customer-service';
import authentication from '../../Services/authentication-service';
import {customerActionCreators} from './CustomerActions'

const customerEffects = {};

customerEffects.fetchCooks = function* () {
    try {
        const cooks = yield call(customerService.fetchCooks);
        yield put(customerActionCreators.fetchCooksSuccessful(cooks));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

export default customerEffects;