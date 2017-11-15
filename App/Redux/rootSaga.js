import {all} from 'redux-saga/effects';
import {menuSagas} from './Menu/MenuActions';
import {authSagas} from './Auth/AuthActions';

const sagas = function* root() {
    yield all([
        ...authSagas,
        ...menuSagas
    ])
};

export default sagas