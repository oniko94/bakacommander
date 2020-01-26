import {applyMiddleware, createStore} from 'redux';
import rootReducer from '@/reducers';
import thunk from 'redux-thunk';

const initialState = {
    pending: false,
    payload: {},
    error: null
};

const middlewares = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

export default store;
