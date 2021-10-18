import {
    CHANGE_TOGGLE_STATE,
    CLEAR_RESPONSE_MESSAGE,
    DISABLE_LOADER,
    ENABLE_LOADER,
    IS_MOBILE,
    SET_CARDS_IN_ROW,
    SET_NUMBER_OF_CARDS,
    SET_RESPONSE_MESSAGE,
} from '../types';

const initialState = {
    isLoading: false,
    resMessage: '',
    toggle: false,
    isMobile: false,
    numberOfCards: 0,
    cardInRow: 0,
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case ENABLE_LOADER:
            return {
                ...state,
                isLoading: true,
            };
        case DISABLE_LOADER:
            return {
                ...state,
                isLoading: false,
            };
        case CHANGE_TOGGLE_STATE:
            return {
                ...state,
                toggle: action.payload,
            };
        case SET_RESPONSE_MESSAGE:
            return {
                ...state,
                resMessage: action.payload,
            };
        case CLEAR_RESPONSE_MESSAGE:
            return {
                ...state,
                resMessage: '',
            };
        case SET_NUMBER_OF_CARDS:
            return {
                ...state,
                numberOfCards: action.payload,
            };
        case SET_CARDS_IN_ROW:
            return {
                ...state,
                cardsInRow: action.payload,
            };
        case IS_MOBILE:
            return {
                ...state,
                isMobile: action.payload,
            };
        default:
            return state;
    }
}

export default appReducer;
