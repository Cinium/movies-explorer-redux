/* eslint-disable react-hooks/exhaustive-deps */
import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import NothingFound from '../NothingFound/NothingFound';
import React, { useEffect, useState } from 'react';
import { DURATION_OF_SHORTS } from '../../utils/constants/constants';
import { connect } from 'react-redux';
import { fetchSavedMovies } from '../../redux/actions';

function SavedMovies({
    isLoading,
    savedMovies,
    searchMovies,
    fetchSavedMovies,
    errorState,
    toggle,
}) {
    const [cardsToShow, setCardsToShow] = useState([]);

    useEffect(() => {
        fetchSavedMovies();

        localStorage.setItem('toggleState', JSON.stringify(false));
        setCardsToShow(savedMovies);
    }, []);

    useEffect(() => {
        if (toggle) {
            setCardsToShow(
                savedMovies.filter(m => {
                    if (m.duration > DURATION_OF_SHORTS) return false;
                    return true;
                })
            );
        } else {
            setCardsToShow(savedMovies);
        }
    }, [toggle, savedMovies]);

    async function searchSavedMovies(input) {
        searchMovies(input, 'saved');
    }

    return (
        <div className="saved-movies">
            <SearchForm searchMovies={searchSavedMovies} />

            {cardsToShow.length === 0 ? (
                <NothingFound
                    message={!savedMovies ? 'Начните поиск!' : 'Ничего('}
                    errorState={errorState}
                />
            ) : (
                <MoviesCardList
                    isLoading={isLoading}
                    movies={cardsToShow}
                    isCardSaved={true}
                />
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        savedMovies: state.movies.savedMovies,
        toggle: state.app.toggle,
        numberOfCards: state.app.numberOfCards,
    };
};

const mapDispatchToProps = {
    fetchSavedMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMovies);
