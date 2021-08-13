import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function loginUser() {
        axios.post('https://bugflixthefirst.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => props.onLoggedIn(response.data))
            .catch(error => console.log('Login failed.'));
    };

    return (
        <Form>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button className='mr-3' variant='dark' onClick={() => loginUser()}>
                Submit
            </Button>
            <Link to={`/register`}>
                <Button variant='dark'>Register</Button>
            </Link>
        </Form>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};
