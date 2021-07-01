import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';

export default class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-featured">
                    <span className="label">Featured: </span>
                    <span className="value">{movie.Featured?'Yes':'No'}</span>
                </div>
                <button onClick={() => onBackClick(null)}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.array.isRequired,
        Genre: PropTypes.array.isRequired,
        Description: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
