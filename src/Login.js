import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import './styles/Login.css';

const Login = () => {
    const history = useHistory();
    const [usernameLog, setUsernameLog] = useState('');
    const [pwdLog, setPwdLog] = useState('');
    
    Axios.defaults.withCredentials = true;

    const loginFunc = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/api/login', { 
                username: usernameLog, 
                password: pwdLog 
            });
    
            if(response.data.status === "Success") {
                history.push('/');
            } else {
                console.log(response.data.error);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className='login'>
            <div className='loginBox'>
                <h2>Login</h2>
                <Link to="/register">Don't have an account? Then Sign-Up!</Link>
                <form>
                    <label htmlFor='username'>Username:</label> <br/>
                    <input
                        type='text'
                        name='username'
                        autoComplete='off'
                        onChange={(e) => {
                            setUsernameLog(e.target.value)
                        }}
                        required
                    /> <br/>
                    <label htmlFor='pwd'>Password:</label> <br/>
                    <input
                        type='password'
                        name='pwd'
                        autoComplete='off'
                        onChange={(e) => {
                            setPwdLog(e.target.value)
                        }}
                        required
                    />
                </form>
                <button onClick={loginFunc}>SIGN IN</button>
            </div>
        </div>
    );
};

export default Login;


