import { push } from 'connected-react-router';
import mainApi from '../utils/MainApi';
import movieApi from '../utils/MoviesApi';
import {
    SET_SAVED_MOVIES,
    SAVE_MOVIE,
    SET_CURRENT_USER,
    ENABLE_LOADER,
    DISABLE_LOADER,
    SET_RESPONSE_MESSAGE,
    CLEAR_RESPONSE_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    UPDATE_USER_INFO,
    LOGOUT,
    SET_MAIN_MOVIES,
    SET_NUMBER_OF_CARDS,
    SET_CARDS_IN_ROW,
    DELETE_MOVIE,
    CHANGE_TOGGLE_STATE,
} from './types';

export function fetchSavedMovies() {
    return async dispatch => {
        try {
            const res = await mainApi.getSavedMovies();
            if (!res.ok) {
                throw new Error('Что-то пошло не так');
            }
            const savedMovies = await res.json();

            localStorage.setItem(
                'savedMovies',
                JSON.stringify(savedMovies)
            );
            dispatch({ type: SET_SAVED_MOVIES, payload: savedMovies });
        } catch (err) {
            console.log(err);
        }
    };
}

export function fetchAllMovies() {
    return async dispatch => {
        try {
            const res = await movieApi.getMovies();
            if (!res.ok) {
                throw new Error('Что-то пошло не так');
            }

            localStorage.setItem('mainMovies', JSON.stringify(res));
            dispatch({ type: SET_MAIN_MOVIES, payload: res });
        } catch (err) {
            console.log(err);
        }
    };
}

export function setMainMovies(movies) {
    return {
        type: SET_MAIN_MOVIES,
        payload: movies,
    };
}

export function setSavedMovies(movies) {
    return {
        type: SET_SAVED_MOVIES,
        payload: movies,
    };
}

export function saveMovie(movie) {
    const {
        country,
        description,
        director,
        duration,
        id,
        nameEN,
        nameRU,
        trailerLink,
        year,
        image,
    } = movie;

    // НАДО ПЕРЕПИСАТЬ БЭКЕНД И ИЗБАВИТЬСЯ ЭТОГО УЖАСА
    return async dispatch => {
        try {
            const res = await mainApi.createMovie(
                country,
                description,
                director,
                duration,
                id,
                `https://api.nomoreparties.co${image.url}`,
                nameEN,
                nameRU,
                trailerLink,
                year,
                `https://api.nomoreparties.co${image.formats.thumbnail.url}`
            );

            if (!res.ok) {
                throw new Error('Не получилось сохранить');
            }

            const movie = await res.json();
            dispatch({ type: SAVE_MOVIE, payload: movie });

            let newArr = JSON.parse(localStorage.getItem('savedMovies')) || [];
            newArr.push(movie);
            localStorage.setItem('savedMovies', JSON.stringify(newArr));
        } catch (e) {
            console.log(e);
        }
    };
}

export function deleteMovie(movieId) {
    return async dispatch => {
        try {
            const res = await mainApi.deleteMovie(movieId);
            if (!res.ok) {
                throw new Error('Карточка не удалилась...');
            }

            dispatch({ type: DELETE_MOVIE, payload: movieId });

            let newArr = JSON.parse(
                localStorage.getItem('savedMovies')
            ).filter(m => m.movieId !== movieId);
            localStorage.setItem('savedMovies', JSON.stringify(newArr));
        } catch (e) {
            console.log(e);
        }
    };
}

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
}

export function login(email, password, resetForm) {
    return async dispatch => {
        try {
            dispatch(showLoader());

            const res = await mainApi.login(email, password);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            const user = await res.json();

            dispatch(success(user));
            dispatch(setCurrentUser(user));
            dispatch(fetchSavedMovies());

            localStorage.setItem('currentUser', JSON.stringify(user));
            resetForm && resetForm();
            dispatch(push('/movies'));
        } catch (e) {
            const text = e.toString();
            dispatch(showResMessage(text));
            dispatch(failure(text));
        } finally {
            dispatch(hideLoader());
        }
    };

    function success(user) {
        return { type: LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: LOGIN_FAIL, error };
    }
}

export function register(name, email, password, resetForm) {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const res = await mainApi.register(name, email, password);

            if (!res || !res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            dispatch(login(email, password));
            resetForm();
        } catch (e) {
            const text = e.toString();
            dispatch(showResMessage(text));
        } finally {
            dispatch(hideLoader());
        }
    };
}

export function logout() {
    return dispatch => {
        dispatch({ type: LOGOUT });
        localStorage.clear();
        dispatch(push('/'));
    };
}

export function changeUserInfo(email, name, resetForm) {
    return async dispatch => {
        dispatch(showLoader());
        try {
            const res = await mainApi.changeUserInfo(email, name);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }
            const user = await res.json();
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            dispatch(success(user));
            dispatch(showResMessage('Сохранено!'));
            setTimeout(() => {
                dispatch(hideResMessage());
            }, 5000);
            resetForm();
        } catch (e) {
            const text = e.toString();
            dispatch(showResMessage(text));
        } finally {
            dispatch(hideLoader());
        }
    };

    function success(user) {
        return { type: UPDATE_USER_INFO, user };
    }
}

export function showResMessage(message) {
    return {
        type: SET_RESPONSE_MESSAGE,
        payload: message,
    };
}

export function hideResMessage() {
    return {
        type: CLEAR_RESPONSE_MESSAGE,
    };
}

export function showLoader() {
    return {
        type: ENABLE_LOADER,
    };
}

export function hideLoader() {
    return {
        type: DISABLE_LOADER,
    };
}

export function setNumberOfCards(num) {
    return {
        type: SET_NUMBER_OF_CARDS,
        payload: num,
    };
}

export function setCardsInRow(num) {
    return {
        type: SET_CARDS_IN_ROW,
        payload: num,
    };
}

export function changeToggleState(newState) {
    return {
        type: CHANGE_TOGGLE_STATE,
        payload: newState
    }
}