import {all} from 'redux-saga/effects'
import {authSagas} from './Auth/AuthRedux'
import {menuSagas} from './Menu/MenuActions';

const sagas = function* root() {
    yield all([
        ...authSagas, menuSagas
    ])
};

export default sagas