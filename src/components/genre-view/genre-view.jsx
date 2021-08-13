import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './genre-view.scss';

export class GenreView extends React.Component {

    render() {
        const { genre, movies, user } = this.props;
        return (
            <div className='genre-view'>
                <Col md={12} className='mb-3 p-0 m-2'>
                    <div className='title'>{genre.Name}</div>
                </Col>
                <Col md={8} className='p-0 m-2'>
                    <div className='genre-description'>
                        <span className='label'>Description: </span>
                        <span className='value'>{genre.Description}</span>
                    </div>
                    <Button className='mt-3' variant='dark' onClick={() => this.props.onBackClick()}>Back</Button>
                </Col>
                <Row noGutters>
                    <Col md={12} className='mt-3 m-2'>
                        <div className='title'>Related Movies</div>
                    </Col>
                    {movies.length!==0
                        ?   movies.map(movie => {
                                const favorite = user.Favorites.includes(movie._id);
                                return (
                                    <Col className='p-2' md={3} key={movie._id}>
                                        <MovieCard 
                                            movie={movie}
                                            favorite={favorite}
                                            addFavorite={movie => this.props.addFavorite(movie)}
                                            removeFavorite={movie => this.props.removeFavorite(movie)}
                                        />
                                    </Col>
                                )
                            })
                        :   <div className='ml-2 mt-2 mb-2'>There are currently no favorites...</div>
                    }
                </Row>
            </div>
        );
    }
}

GenreView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
        Favorites: PropTypes.array.isRequired,
    }).isRequired,
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    movies: PropTypes.array.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
};
