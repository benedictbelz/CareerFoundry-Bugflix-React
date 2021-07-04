import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';

export class DirectorView extends React.Component {

    render() {
        const { director, movies, user } = this.props;
        return (
            <div className="director-view">
                <Col md={12} className="mb-3 p-0 m-2">
                    <div className="title">{director.Name}</div>
                </Col>
                <Col md={8} className="p-0 m-2">
                    <div className="director-bio">
                        <span className="label">Bio: </span>
                        <span className="value">{director.Bio}</span>
                    </div>
                    <div className="director-birth">
                        <span className="label">Birth: </span>
                        <span className="value">{director.Birth}</span>
                    </div>
                    <Button className="mt-3" variant="dark" onClick={() => this.props.onBackClick()}>Back</Button>
                </Col>
                <Row noGutters>
                    <Col md={12} className="mt-3 m-2">
                        <div className="title">Related Movies</div>
                    </Col>
                    {movies.length!==0
                        ?   movies.map(movie => {
                                return (
                                    <Col className="p-2" md={3} key={movie._id}>
                                        <MovieCard 
                                            movie={movie}
                                            favorite={user.Favorites.includes(movie._id)}
                                            addFavorite={movie => this.props.addFavorite(movie)}
                                            removeFavorite={movie => this.props.removeFavorite(movie)}
                                        />
                                    </Col>
                                )
                            })
                        :   <div className="ml-2 mt-2 mb-2">There are currently no favorites...</div>
                    }
                </Row>
            </div>
        );
    }
}

DirectorView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
        Favorites: PropTypes.array.isRequired,
    }).isRequired,
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }).isRequired,
    movies: PropTypes.array.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
};
