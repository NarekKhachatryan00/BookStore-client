import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './styles/Register.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
    const [usernameReg, setUsernameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [pwdReg, setPwdReg] = useState('');
    const history = useHistory('');

    const registerFunc = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/api/register', { 
                username: usernameReg, 
                email: emailReg, 
                password: pwdReg 
            });
            if(response.statusText === 'Created') {
                console.log(response);
                history.push('/login')
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className='register'>
            <div className='registerBox'>
                <h2>Register</h2>
                <Link to="/login">Already have an account? Then Sign-In!</Link>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='username'><strong>Userame:</strong></label> <br/>
                    <input
                        type='text'
                        name='username'
                        onChange={(e) => setUsernameReg(e.target.value)}
                        autoComplete='off'
                        required
                    /> <br/>
                    <label htmlFor='email'><strong>Email:</strong></label> <br/>
                    <input
                        type='email'
                        name='email'
                        onChange={(e) => setEmailReg(e.target.value)}
                        autoComplete='off'
                        required
                    /> <br/>
                    <label htmlFor='password'><strong>Password:</strong></label> <br/>
                    <input
                        type='password'
                        name='password'
                        onChange={(e) => setPwdReg(e.target.value)}
                        autoComplete='off'
                        required
                    /> <br/>
                </form>
                <button onClick={registerFunc}>SIGN UP</button>
            </div>
        </div>
    );
};

export default Register;