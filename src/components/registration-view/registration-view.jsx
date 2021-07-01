import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';

export default function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = () => {
        
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                E-Mail:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
    );
}
