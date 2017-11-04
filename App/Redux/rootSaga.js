import {all} from 'redux-saga/effects'
import {authSagas} from './Auth/AuthRedux'

const sagas = function* root() {
    yield all([
        ...authSagas,
    ])
};

export default sagas