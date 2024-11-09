import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './styles/Navbar.css';

const Navbar = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await Axios.get('http://localhost:3001', { withCredentials: true });
        if (response.data.status === 'Success') {
          setAuth(true);
          setName(response.data.name); // Set name from response
        } else {
          setAuth(false);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    Axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true })
      .then(() => {
        setAuth(false);
        setName('');
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <nav>
      <div>
        <img src="/brand-logo.png" alt="Main Logo" style={{ width: '280px', height: '160px' }} />
      </div>
      <div className="navbar">
        <div className="navhome">
          <Link to="/"> <img src="/homepage-logo.png" alt="Homepage" style={{ width: '42px', height: '42px' }} /> </Link>
        </div>
        <div className="navbasket">
          <Link to="/basket"> <img src="/basket-logo.png" alt="Basket" style={{ width: '42px', height: '42px' }} /> </Link>
        </div>
        {auth ? (
          <div className="logout">
            <span>Welcome, {name}</span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <>
            <div className="sign-up">
              <Link to="/register">SIGN UP</Link>
            </div>
            <div className="sign-in">
              <Link to="/login">SIGN IN</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
