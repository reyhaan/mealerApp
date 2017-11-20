import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from '../Redux/rootReducer'
import rootSaga from './rootSaga'
import Reactotron from 'reactotron-react-native'

export default function configureStore() {

    const sagaMonitor = Reactotron.createSagaMonitor()
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}