import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Favorite } from '../favorite/favorite';
import './movie-view.scss';

export class MovieView extends React.Component {
    render() {
        const { director, genre, movie } = this.props;
        return (
            <div className="movie-view m-2">
                <div className="movie-poster">
                    <Favorite
                        favorite={this.props.favorite}
                        addFavorite={() => this.props.addFavorite(movie._id)}
                        removeFavorite={() => this.props.removeFavorite(movie._id)}
                    />
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title mt-3 mb-3">
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director}`}>
                        <span className="value">{director.Name}</span>
                    </Link>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <Link to={`/genres/${movie.Genre}`}>
                        <span className="value">{genre.Name}</span>
                    </Link>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-featured">
                    <span className="label">Featured: </span>
                    <span className="value">{movie.Featured?'Yes':'No'}</span>
                </div>
                <Button className="mt-3" variant="dark" onClick={() => this.props.onBackClick()}>Back</Button>
            </div>
        );
    }
}

MovieView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }).isRequired,
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    movie: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    favorite: PropTypes.bool.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired
};
