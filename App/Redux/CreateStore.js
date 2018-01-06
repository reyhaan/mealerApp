import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from '../Redux/rootReducer'
import rootSaga from './rootSaga'

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}