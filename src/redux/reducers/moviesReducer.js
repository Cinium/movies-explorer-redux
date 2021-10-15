import {
    SET_SAVED_MOVIES,
    SAVE_MOVIE,
    SET_MAIN_MOVIES,
    DELETE_MOVIE,
} from '../types';

let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
let movies = JSON.parse(localStorage.getItem('mainMovies'));

const intialState = {
    movies: movies ? movies : [],
    savedMovies: savedMovies ? savedMovies : [],
};

function moviesReducer(state = intialState, action) {
    switch (action.type) {
        case SAVE_MOVIE:
            return {
                ...state,
                savedMovies: state.savedMovies.concat([action.payload]),
            };
        case SET_SAVED_MOVIES:
            return {
                ...state,
                savedMovies: action.payload,
            };
        case SET_MAIN_MOVIES:
            return {
                ...state,
                movies: action.payload,
            };
        case DELETE_MOVIE:
            return {
                ...state,
                savedMovies: state.savedMovies.filter(
                    m => m.movieId !== action.payload
                ),
            };
        default:
            return state;
    }
}

export default moviesReducer;
