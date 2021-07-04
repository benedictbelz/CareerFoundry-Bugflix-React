import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';

export function ProfileView(props) {
    const { user, token, movies } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    function loginUser() {
        axios.post('https://bugflixthefirst.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => props.onLoggedIn(response.data))
            .catch(error => console.log('Login failed.'));
    };

    function updateUser() {
        if (username==='' ||
            password==='' ||
            email==='' ||
            birthday==='') {
            console.log('Please fill in all fields.');
            return;
        }
        axios.put('https://bugflixthefirst.herokuapp.com/users/'+user.Username,
        {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                console.log(response.data);
                loginUser();
            })
            .catch(error => console.log('Update failed.'));
    };

    function deleteUser() {
        axios.delete('https://bugflixthefirst.herokuapp.com/users/'+user.Username,
        {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                console.log(response.data);
                props.onLoggedOut();
            })
            .catch(error => console.log('Deletion failed.'));
    }

    return (
        <div className="profile-view">
            <Col md={12} className="mb-3 p-0 m-2">
                <div className="title">Profile</div>
            </Col>
            <Col className="mb-3 p-0 m-2">
                <div className="username">Username: {user.Username}</div>
                <div className="email">E-Mail: {user.Email}</div>
                <div className="birthday">Birthday: {user.Birthday.split('T')[0]}</div>
            </Col>
            <Col md={12} className="mb-3 p-0 m-2">
                <div className="title">Settings</div>
            </Col>
            <Col md={6} className="p-0 m-2">
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>E-Mail:</Form.Label>
                        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                </Form>
            </Col>
            <Col md={12} className="mt-4 mb-3 p-0 m-2">
                <Button className="mr-3" variant="dark" type="button" onClick={() => updateUser()}>
                    Save
                </Button>
                <Button className="mr-3" variant="danger" onClick={() => deleteUser()}>Delete</Button>
            </Col>
            <Row noGutters>
                <Col md={12} className="m-2">
                    <div className="title">Favorites</div>
                </Col>
                {movies.length!==0
                    ?   movies.map(movie => {
                            const favorite = user.Favorites.includes(movie._id);
                            return (
                                <Col className="p-2" md={3} key={movie._id}>
                                    <MovieCard 
                                        movie={movie}
                                        favorite={favorite}
                                        addFavorite={movie => props.addFavorite(movie)}
                                        removeFavorite={movie => props.removeFavorite(movie)}
                                    />
                                </Col>
                            )
                        })
                    :   <div className="ml-2 mt-2 mb-2">There are currently no favorites...</div>
                }
                <Col md={12} className="mt-3 m-2">
                    <Button variant="dark" onClick={() => props.onBackClick()}>Back</Button>
                </Col>
            </Row>
        </div>
    );
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
        Favorites: PropTypes.array.isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired,
    onLoggedOut: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
};
