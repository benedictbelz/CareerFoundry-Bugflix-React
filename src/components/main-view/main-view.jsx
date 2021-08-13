import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setDirectors, setGenres, setMovies, setUser, setToken } from '../../actions/actions';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import MovieList from '../movie-list/movie-list';

import './main-view.scss';

class MainView extends React.Component {

	constructor(props) {
        super(props);
        this.props.setUser(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null);
		this.props.setToken(localStorage.getItem('token'));
    }

	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token !== null) {
			this.props.setUser(JSON.parse(localStorage.getItem('user')));
			this.getDirectors(token);
            this.getGenres(token);
			this.getMovies(token);
		}
	}

	onLoggedIn(authentification) {
		this.props.setUser(authentification.user);
		this.props.setToken(authentification.token);
		localStorage.setItem('user', authentification.user);
		localStorage.setItem('token', authentification.token);
		this.getDirectors(authentification.token);
		this.getGenres(authentification.token);
		this.getMovies(authentification.token);
	}

	onLoggedOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.props.setUser(null);
        this.props.setToken(null);
    }

	addFavorite(movie) {
        axios.post(
            'https://bugflixthefirst.herokuapp.com/users/'
            +this.props.user.Username+'/favourites/'+movie,
        {},
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
            .then(response => {
                console.log('Add Favorite: '+movie);
                this.props.setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(error => console.log(error));
    }

    removeFavorite(movie) {
        axios.delete(
            'https://bugflixthefirst.herokuapp.com/users/'
            +this.props.user.Username+'/favourites/'+movie,
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
            .then(response => {
                console.log('Remove Favorite: '+movie);
                this.props.setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(error => console.log(error));
    }

	getDirectors(token) {
        axios.get('https://bugflixthefirst.herokuapp.com/directors', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => this.props.setDirectors(response.data))
            .catch(error => console.log(error));
    }

    getGenres(token) {
        axios.get('https://bugflixthefirst.herokuapp.com/genres', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => this.props.setGenres(response.data))
            .catch(error => console.log(error));
    }

	getMovies(token) {
        axios.get('https://bugflixthefirst.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => this.props.setMovies(response.data))
            .catch(error => console.log(error));
    }

	render() {
		let { directors, genres, movies, user } = this.props

		return (
			<Router>
				<Row noGutters className='header p-3'>
                    <Link to={`/`}>
                        <Col className='title p-0'>
                            <img className='mr-2' src='http://www.pngall.com/wp-content/uploads/2016/03/Bug-PNG-2.png' />
                            <span>Bugflix</span>
                        </Col>
                    </Link>
                    {user && (
                        <Col className='button'>
                            <Link to={`/profile`}>
                                    <Button className='mr-3' variant='dark'>Profile</Button>
                            </Link>
                            <Link to={`/`}>
                                    <Button variant='dark' onClick={() => this.onLoggedOut()}>Logout</Button>
                            </Link>
                        </Col>
                    )}
                </Row>
				<Row className='main-view m-2 justify-content-md-left'>
					
					<Route exact path='/' render={() => {
						if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>
						if (directors.length === 0 || genres.length === 0 || movies.length === 0) return;
						return <MovieList
							user={user}
							movies={movies}
							addFavorite={movie => this.addFavorite(movie)}
							removeFavorite={movie => this.removeFavorite(movie)}
						/>
					}} />

					<Route path='/register' render={() => {
						if (user) return <Redirect to='/' />
						return (
                            <Col>
                                <RegistrationView 
                                    onLoggedIn={user => this.onLoggedIn(user)}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        );
					}} />

					<Route exact path='/profile' render={({ history }) => {
                        if (!user) return <Redirect to='/' />
                        return (
                            <Col>
								<ProfileView 
                                    user={user}
                                    token={this.props.token}
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

					<Route path='/movies/:movieId' render={({ match, history }) => {
                        if (!user) return <Redirect to='/' />
                        if (directors.length === 0 || genres.length === 0 || movies.length === 0) return;
                        const movie = movies.find(movie => movie._id === match.params.movieId);
                        const director = directors.find(director => director._id === movie.Director);
                        const genre = genres.find(genre => genre._id === movie.Genre);
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

					<Route path='/genres/:genreId' render={({ match, history }) => {
                        if (!user) return <Redirect to='/' />
                        if (directors.length === 0 || genres.length === 0 || movies.length === 0) return;
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

					<Route path='/directors/:directorId' render={({ match, history }) => {
                        if (!user) return <Redirect to='/' />
                        if (directors.length === 0 || genres.length === 0 || movies.length === 0) return;
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
		user: state.user,
		token: state.token
	}
}

export default connect(mapStateToProps, { setDirectors, setGenres, setMovies, setUser, setToken })(MainView);