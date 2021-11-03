/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import movieApi from '../../utils/MoviesApi';
import {
    SCREEN_SIZE,
    CARDS_FOR,
    MORE_CARDS,
} from '../../utils/constants/constants';
import {
    fetchSavedMovies,
    hideLoader,
    setMainMovies,
    setSavedMovies,
    showLoader,
    setNumberOfCards,
    setCardsInRow,
    setIsMobile,
} from '../../redux/actions';

function App() {
    const [errorState, setErrorState] = useState(false);

    const savedMovies = useSelector(state => state.movies.savedMovies);
    const isMobile = useSelector(state => state.app.isMobile);
    const loggedIn = useSelector(state => state.user.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        checkViewWidth();
        window.addEventListener('resize', checkViewWidth);

        if (loggedIn) dispatch(fetchSavedMovies());
        
        localStorage.setItem('toggleState', JSON.stringify(false));
    }, []);

    function checkViewWidth() {
        if (window.innerWidth >= SCREEN_SIZE.BIG) {
            dispatch(setCardsInRow(MORE_CARDS.MANY));
            dispatch(setNumberOfCards(CARDS_FOR.BIG_SCREEN));
            dispatch(setIsMobile(false));
        } else if (
            SCREEN_SIZE.MIDDLE <= window.innerWidth &&
            window.innerWidth < SCREEN_SIZE.BIG
        ) {
            dispatch(setCardsInRow(MORE_CARDS.FEW));
            dispatch(setNumberOfCards(CARDS_FOR.MIDDLE_SCREEN));
            dispatch(setIsMobile(false));
        } else if (window.innerWidth < SCREEN_SIZE.MIDDLE) {
            dispatch(setCardsInRow(MORE_CARDS.FEW));
            dispatch(setNumberOfCards(CARDS_FOR.MOBILE));
            dispatch(setIsMobile(true));
        }
    }

    async function searchMovies(input, moviesType) {
        dispatch(showLoader());

        if (!localStorage.getItem('savedMovies')) {
            dispatch(fetchSavedMovies());
        }

        const moviesList =
            moviesType === 'main'
                ? await movieApi.getMovies()
                : savedMovies;

        try {
            const searchResult = moviesList.filter(obj => {
                let RuIncludes = false;
                let EnIncludes = false;

                if (typeof obj.nameRU === 'string') {
                    RuIncludes = obj.nameRU
                        .toLowerCase()
                        .includes(input.toLowerCase());
                }
                if (typeof obj.nameEN === 'string') {
                    EnIncludes = obj.nameEN
                        .toLowerCase()
                        .includes(input.toLowerCase());
                }

                return RuIncludes || EnIncludes;
            });

            if (moviesType === 'main') {
                localStorage.setItem(
                    'mainMovies',
                    JSON.stringify(searchResult)
                );
                dispatch(setMainMovies(searchResult));
            } else {
                dispatch(setSavedMovies(searchResult));
            }
        } catch (err) {
            setErrorState(true);
            console.log(err);
        } finally {
            dispatch(hideLoader());
        }
    }

    return (
        <div className="App">
            <Route
                exact
                path={['/', '/profile', '/saved-movies', '/movies']}
            >
                <Header />
            </Route>

            <Switch>
                <Route exact path="/" component={Main} />

                <ProtectedRoute
                    exact
                    path="/movies"
                    component={Movies}
                    searchMovies={searchMovies}
                    errorState={errorState}
                />
                <ProtectedRoute
                    exact
                    path="/saved-movies"
                    component={SavedMovies}
                    movies={savedMovies}
                    searchMovies={searchMovies}
                    errorState={errorState}
                />
                <ProtectedRoute
                    exact
                    path="/profile"
                    component={Profile}
                />

                <Route exact path="/signin">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Register />
                </Route>
                <Route component={NotFound} />
            </Switch>

            <Route
                exact
                path={[
                    '/',
                    !isMobile ? '/profile' : '',
                    '/saved-movies',
                    '/movies',
                ]}
                component={Footer}
            />
        </div>
    );
}

export default App;
