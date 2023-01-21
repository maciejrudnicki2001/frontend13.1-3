import React, { useState, useEffect } from 'react';
import Users from '../data/Users.json';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState(Users);




    // set users from json file
    useEffect(() => {
        setUsers(Users);
    } , []);

    const handleSubmit = event => {
        event.preventDefault();
        // Weryfikacja pól
        if (!email || !password) {
            setErrorMessage('Proszę podać adres email i hasło.');
            return;
        }
        if (!email.includes('@')) {
            setErrorMessage('Proszę podać prawidłowy adres email.');
            return;
        }
        // Sprawdzenie poprawności danych logowania z pliku JSON
        const isValidLogin = users.some(user => user.email === email && user.password === password);
        if (isValidLogin) {
            setErrorMessage('');
            setIsLoggedIn(true);
        } else {
            setErrorMessage('Niepoprawny adres email lub hasło.');
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>Zostałeś zalogowany.</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {errorMessage && <div>{errorMessage}</div>}
                    <label htmlFor="email">Adres email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <br />
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <br />
                    <button type="submit">Zaloguj</button>
                </form>
            )}
        </div>
    );
};

export default LoginForm;