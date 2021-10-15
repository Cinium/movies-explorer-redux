import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_CURRENT_USER,
    UPDATE_USER_INFO,
} from '../types';

let user = JSON.parse(localStorage.getItem('currentUser'));
const initialState = user ? { loggedIn: true, user } : {};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user,
            };
        case LOGIN_FAIL:
            return {};
        case LOGOUT:
            return {};
        case UPDATE_USER_INFO:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}

export default userReducer;
