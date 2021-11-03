/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Movies.css';
import MoreMovies from './MoreMovies/MoreMovies';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import NothingFound from '../NothingFound/NothingFound';
import { DURATION_OF_SHORTS } from '../../utils/constants/constants';

function Movies({
    searchMovies,
    movies,
    errorState,
    numberOfCards,
    toggle,
}) {
    const [cardsToShow, setCardsToShow] = useState([]);
    const [cardsToSlice, setCardsToSlice] = useState([]);

    useEffect(() => {
        setCardsToShow([]);
        filterShorts();
    }, [toggle, movies]);

    function filterShorts() {
        if (toggle) {
            setCardsToSlice(
                movies.filter(m => {
                    if (m.duration > DURATION_OF_SHORTS) {
                        return false;
                    }
                    return true;
                })
            );
        } else {
            setCardsToSlice(movies);
        }
    }

    function searchMainMovies(input) {
        searchMovies(input, 'main');
        setCardsToShow([]);
    }

    function sliceMovies(start, end) {
        const slicedPosts = cardsToSlice.slice(start, end);
        setCardsToShow([...cardsToShow, ...slicedPosts]);
    }

    console.log(movies)

    return (
        <div className="movies">
            <SearchForm searchMovies={searchMainMovies} />

            {!movies || movies.length === 0 ? (
                <NothingFound
                    message={
                        movies === null
                            ? 'Начните поиск!'
                            : 'Ничего не найдено :-('
                    }
                    errorState={errorState}
                />
            ) : (
                <>
                    <MoviesCardList
                        movies={
                            cardsToSlice.length > numberOfCards
                                ? cardsToShow
                                : cardsToSlice
                        }
                        isCardSaved={false}
                    />
                    {cardsToSlice.length > numberOfCards && (
                        <MoreMovies
                            movies={cardsToSlice}
                            sliceMovies={sliceMovies}
                        />
                    )}
                </>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        movies: state.movies.movies,
        toggle: state.app.toggle,
        numberOfCards: state.app.numberOfCards,
    };
};

export default connect(mapStateToProps, null)(Movies);
