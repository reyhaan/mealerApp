import {all} from 'redux-saga/effects'
import {userSagas} from './User/UserRedux'

const sagas = function* root() {
    yield all([
        ...userSagas,
    ])
};

export default sagas