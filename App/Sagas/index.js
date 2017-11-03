import {all} from 'redux-saga/effects'
import {userSagas} from './UserSagas'

const sagas = function* root() {
    yield all([
        ...userSagas,
    ])
};

export default sagas