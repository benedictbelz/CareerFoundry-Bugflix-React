import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Favorite } from '../favorite/favorite';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, favorite } = this.props;

        return (
            <Card className="movie-card h-100">
                <Favorite
                    favorite={favorite}
                    addFavorite={() => this.props.addFavorite(movie._id)}
                    removeFavorite={() => this.props.removeFavorite(movie._id)}
                />
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link className="mt-auto" to={`/movies/${movie._id}`}>
                        <Button variant="dark">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
    }).isRequired,
    favorite: PropTypes.bool.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired
};
