import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';
import { setDirectors, setGenres, setMovies, setUser } from '../../actions/actions';

import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView} from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import './main-view.scss';

class MainView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
            token: localStorage.getItem('token')?localStorage.getItem('token'):null
        }
    }

    componentDidMount() {
        if (this.state.token !== null) {
            this.getDirectors();
            this.getGenres();
            this.getMovies();
        }
    }

    onLoggedIn(authentification) {
        const token = authentification.token;
        this.props.setUser(authentification.user)
        this.setState({ user: authentification.user, token });
        localStorage.setItem('user', JSON.stringify(authentification.user));
        localStorage.setItem('token', token);
        this.getMovies();
        this.getGenres();
        this.getMovies();
    }

    onLoggedOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({ user: null, token: null });
    }

    addFavorite(movie) {
        axios.post(
            'https://bugflixthefirst.herokuapp.com/users/'
            +this.state.user.Username+'/favourites/'+movie,
        {},
        {
            headers: { Authorization: `Bearer ${this.state.token}` }
        })
            .then(response => {
                console.log('Add Favorite: '+movie);
                this.setState({ user: response.data });
                localStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(error => console.log(error));
    }

    removeFavorite(movie) {
        axios.delete(
            'https://bugflixthefirst.herokuapp.com/users/'
            +this.state.user.Username+'/favourites/'+movie,
        {
            headers: { Authorization: `Bearer ${this.state.token}` }
        })
            .then(response => {
                console.log('Remove Favorite: '+movie);
                this.setState({ user: response.data });
                localStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(error => console.log(error));
    }

    getDirectors() {
        axios.get('https://bugflixthefirst.herokuapp.com/directors', {
            headers: { Authorization: `Bearer ${this.state.token}` }
        })
            .then(response => this.props.setDirectors(response.data))
            .catch(error => console.log(error));
    }

    getGenres() {
        axios.get('https://bugflixthefirst.herokuapp.com/genres', {
            headers: { Authorization: `Bearer ${this.state.token}` }
        })
            .then(response => this.props.setGenres(response.data))
            .catch(error => console.log(error));
    }

    getMovies() {
        axios.get('https://bugflixthefirst.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${this.state.token}` }
        })
            .then(response => this.props.setMovies(response.data))
            .catch(error => console.log(error));
    }

    render() {
        const { directors, genres, movies } = this.props;
        const { user, token } = this.state;
    
        return (
            <Router>
                <Row noGutters className="header p-3">
                    <Link to={`/`}>
                        <Col className="title p-0">
                            <img className="mr-2" src="http://www.pngall.com/wp-content/uploads/2016/03/Bug-PNG-2.png" />
                            <span>Bugflix</span>
                        </Col>
                    </Link>
                    {user && (
                        <Col className="button">
                            <Link to={`/profile`}>
                                    <Button className="mr-3" variant="dark">Profile</Button>
                            </Link>
                            <Link to={`/`}>
                                    <Button variant="dark" onClick={() => this.onLoggedOut()}>Logout</Button>
                            </Link>
                        </Col>
                    )}
                </Row>
                <Row noGutters className="main-view m-2 justify-content-md-left">
                    <Route exact path="/" render={() => {
                        // IF NO USER RETURN TO LOGIN
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        )
                        // IF NO CONTENT RETURN
                        if (directors.length === 0 ||
                            genres.length === 0 ||
                            movies.length === 0)
                            return;
                        // MAP ALL MOVIES
                        return movies.map(movie => {
                            const favorite = user.Favorites.includes(movie._id);
                            return (
                                <Col className="p-2" md={3} key={movie._id}>
                                    <MovieCard 
                                        movie={movie}
                                        favorite={favorite}
                                        addFavorite={movie => this.addFavorite(movie)}
                                        removeFavorite={movie => this.removeFavorite(movie)}
                                    />
                                </Col>
                            )
                        });
                    }} />
                    <Route exact path="/register" render={({ history }) => {
                        // IF USER REDIRECT TO MAIN PAGE
                        if (user) return <Redirect to="/" />
                        // RETURN REGISTRATION VIEW
                        return ( 
                            <Col>
                                <RegistrationView 
                                    onLoggedIn={user => this.onLoggedIn(user)}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }} />
                    <Route exact path="/profile" render={({ history }) => {
                        // IF NO USER REDIRECT TO MAIN PAGE
                        if (!user) return <Redirect to="/" />
                        // RETURN PROFILE VIEW
                        return (
                            <Col>
                                <ProfileView 
                                    user={user}
                                    token={token}
                                    movies={movies.filter(movie => user.Favorites.includes(movie._id))}
                                    addFavorite={movie => this.addFavorite(movie)}
                                    removeFavorite={movie => this.removeFavorite(movie)}
                                    onLoggedIn={user => this.onLoggedIn(user)}
                                    onLoggedOut={() => this.onLoggedOut()}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }} />
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        // IF NO USER REDIRECT TO MAIN PAGE
                        if (!user) return <Redirect to="/" />
                        // IF NO CONTENT RETURN
                        if (directors.length === 0 ||
                            genres.length === 0 ||
                            movies.length === 0)
                            return;
                        // GET DIRECTOR, GENRE, MOVIE, FAVORITE
                        const movie = movies.find(movie => movie._id === match.params.movieId);
                        const director = directors.find(director => director._id === movie.Director);
                        const genre = genres.find(genre => genre._id === movie.Genre);
                        // RETURN MOVIE VIEW
                        return (
                            <Col md={8}>
                                <MovieView 
                                    director={director}
                                    genre={genre}
                                    movie={movie}
                                    favorite={user.Favorites.includes(movie._id)}
                                    addFavorite={movie => this.addFavorite(movie)}
                                    removeFavorite={movie => this.removeFavorite(movie)}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }} />
                    <Route path="/genres/:genreId" render={({ match, history }) => {
                        // IF NO USER REDIRECT TO MAIN PAGE
                        if (!user) return <Redirect to="/" />
                        if (directors.length === 0 ||
                            genres.length === 0 ||
                            movies.length === 0)
                            return;
                        // RETURN GENRE VIEW
                        return (
                            <Col>
                                <GenreView
                                    user={user}
                                    genre={genres.find(genre => genre._id === match.params.genreId)}
                                    movies={movies.filter(movie => movie.Genre === match.params.genreId)}
                                    addFavorite={movie => this.addFavorite(movie)}
                                    removeFavorite={movie => this.removeFavorite(movie)}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }} />
                    <Route path="/directors/:directorId" render={({ match, history }) => {
                        if (!user) return <Redirect to="/" />
                        if (directors.length === 0 ||
                            genres.length === 0 ||
                            movies.length === 0)
                            return;
                        // RETURN DIRECTOR VIEW
                        return (
                            <Col>
                                <DirectorView
                                    user={user}
                                    director={directors.find(director => director._id === match.params.directorId)}
                                    movies={movies.filter(movie => movie.Director === match.params.directorId)}
                                    addFavorite={movie => this.addFavorite(movie)}
                                    removeFavorite={movie => this.removeFavorite(movie)}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
                    }} />
                </Row>
            </Router>
        );
      }

}

let mapStateToProps = state => {
    return { 
        directors: state.directors,
        genres: state.genres,
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { setDirectors, setGenres, setMovies, setUser } )(MainView);