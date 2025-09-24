import React, { useState } from 'react';
import { useAuthContext } from '../../Contexts/AuthContext';

const LoginDiv: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuthContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        login(username, password);
    };

    return (
        <form className='popupbox' onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            <div className='input-group'>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className='input-group'>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginDiv;