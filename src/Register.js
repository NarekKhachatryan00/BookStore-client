import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './styles/Register.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [pwdReg, setPwdReg] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const validateUsername = (username) => {
        const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*_).{4,}$/; 
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*_).{8,}$/;  
        return passwordRegex.test(password);
    };


    const registerFunc = async () => {
        setError('');
        if (!usernameReg || !emailReg || !pwdReg || !confirmPwd) {
            setError('All fields are required.');
            return;
        };
        if (!validateUsername(usernameReg)) {
            setError('Username must be at least 4 characters long and contain only letters,numbers and underscore.');
            return;
        };
        if (!validatePassword(pwdReg)) {
            setError('Password must be at least 8 characters long and contain letters, numbers, and underscore.');
            return;
        };
        if (pwdReg !== confirmPwd) {
            setError('Passwords do not match.');
            return;
        };
        try {
            const response = await Axios.post('http://localhost:3001/api/register', { 
                username: usernameReg, 
                email: emailReg, 
                password: pwdReg 
            });

            if (response.status === 201) {
                console.log(response);
                history.push('/login'); 
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.error || 'An error occurred during registration.');
        }
    };

    return (
        <div className='register'>
            <div className='registerBox'>
                <h2>Register</h2>
                <Link to="/login">Already have an account? Then Sign-In!</Link>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='username'><strong>Username:</strong></label> <br />
                    <input
                        type='text'
                        name='username'
                        onChange={(e) => setUsernameReg(e.target.value)}
                        value={usernameReg}
                        autoComplete='off'
                        required
                    /> <br />

                    <label htmlFor='email'><strong>Email:</strong></label> <br />
                    <input
                        type='email'
                        name='email'
                        onChange={(e) => setEmailReg(e.target.value)}
                        value={emailReg}
                        autoComplete='off'
                        required
                    /> <br />

                    <label htmlFor='password'><strong>Password:</strong></label> <br />
                    <input
                        type='password'
                        name='password'
                        onChange={(e) => setPwdReg(e.target.value)}
                        value={pwdReg}
                        autoComplete='off'
                        required
                    /> <br />

                    <label htmlFor='confirm-password'><strong>Confirm Password:</strong></label> <br />
                    <input
                        type='password'
                        name='confirm-password'
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        value={confirmPwd}
                        autoComplete='off'
                        required
                    /> <br />
                </form>
                <button onClick={registerFunc}>SIGN UP</button>
            </div>
        </div>
    );
};

export default Register;