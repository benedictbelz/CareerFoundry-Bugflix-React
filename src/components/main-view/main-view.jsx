import axios from 'axios';
import React from 'react';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import MovieCard from '../movie-card/movie-card';
import './main-view.scss';

export default class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        }
    }

    onLoggedIn(user) {
        this.setState({
            user
        })
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        })
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return (<>
            <RegistrationView />
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </>);

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={movie => this.setSelectedMovie(movie)} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => this.setSelectedMovie(movie)} />
                    ))
                }
            </div>
        );
    }

    componentDidMount() {
        axios.get('https://bugflixthefirst.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}