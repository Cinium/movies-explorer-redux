import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import moviesReducer from './moviesReducer';
import appReducer from './appReducer';
import { history } from '../../utils/history';

export const rootReducer = combineReducers({
    router: connectRouter(history),
    movies: moviesReducer,
    user: userReducer,
    app: appReducer,
});
