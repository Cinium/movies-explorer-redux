import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';
import { connect } from 'react-redux';

function MoviesCardList({
    isLoading,
    movies,
    isCardSaved,
}) {
    return isLoading ? (
        <Preloader />
    ) : (
        <div className="movies-list">
            {movies.map(movie => {
                return (
                    <MoviesCard
                        movie={movie}
                        key={movie.id || movie.movieId}
                        saved={isCardSaved}
                    />
                );
            })}
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
    isLoading: state.app.isLoading
})

export default connect(mapStateToProps, null)(MoviesCardList);
