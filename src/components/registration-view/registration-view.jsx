import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
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

    function registerUser() {
        axios.post('https://bugflixthefirst.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                console.log(response.data);
                loginUser()
            })
            .catch(error => console.log('Registration failed.'));
    };

    return (
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
            <Button className="mr-3" variant="dark" type="button" onClick={() => registerUser()}>
                Submit
            </Button>
            <Button variant="dark" onClick={() => props.onBackClick()}>Back</Button>
        </Form>
    );
}

RegistrationView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
};
