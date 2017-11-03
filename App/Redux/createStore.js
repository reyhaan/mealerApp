import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from '../Redux/rootReducer'
import rootSaga from '../Sagas'

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}