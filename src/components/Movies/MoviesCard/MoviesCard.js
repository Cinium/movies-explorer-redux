/* eslint-disable react-hooks/exhaustive-deps */
import './MoviesCard.css';
import likedIcon from '../../../images/saved-icon.svg';
import xIcon from '../../../images/x-icon.svg';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { saveMovie, deleteMovie } from '../../../redux/actions';

function MoviesCard({
    movie,
    deleteMovie,
    saved,
    liked,
    saveMovie,
    savedMovies,
}) {
    const [isLiked, setIsLiked] = useState(liked);

    useEffect(() => {
        checkLikeIcon();
    }, []);

    function checkLikeIcon() {
        if (!saved) {
            savedMovies.some(sm => sm.movieId === movie.id)
                ? setIsLiked(true)
                : setIsLiked(false);
        } else {
            setIsLiked(false);
        }
        
    }

    async function handleLike() {
        await saveMovie(movie);
        setIsLiked(!isLiked);
    }

    function handleDelete() {
        deleteMovie(movie.movieId || movie.id);
    }

    function showTrailer() {
        saved
            ? window.open(movie.trailer)
            : window.open(movie.trailerLink);
    }

    return (
        <div className="movies-card">
            <div className="movies-card__info">
                <h3 className="movies-card__name">{movie.nameRU}</h3>
                <p className="movies-card__duration">
                    {movie.duration} минут
                </p>
            </div>

            <div
                className="movies-card__image-container"
                onClick={showTrailer}
            >
                <img
                    className="movies-card__image"
                    alt={`изображение фильма «${movie.nameRU}»`}
                    src={
                        movie.image.url
                            ? `https://api.nomoreparties.co${movie.image.url}`
                            : movie.image
                    }
                />
            </div>

            <button
                type="button"
                className={`movies-card__button button ${
                    isLiked ? 'movies-card__button_liked' : ''
                }`}
                onClick={saved || isLiked ? handleDelete : handleLike}
            >
                {!saved && !isLiked ? (
                    <p className={`movies-card__button-text`}>Сохранить</p>
                ) : (
                    <img
                        src={isLiked ? likedIcon : xIcon}
                        alt="сохранено"
                    />
                )}
            </button>
        </div>
    );
}

const mapStateToProps = state => ({
    savedMovies: state.movies.savedMovies,
});

const mapDispatchToProps = {
    saveMovie,
    deleteMovie
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesCard);
