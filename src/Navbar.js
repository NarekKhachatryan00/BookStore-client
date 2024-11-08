import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/brand-logo.png" alt='Main Logo' style={{ width: '280px', height: '160px' }}/>
            </div>
            <div className='navbar'>
                <div className='navhome'>
                    <Link to='/'> <img src='/homepage-logo.png' alt='Homepage' style={{ width: '42px', height:'42px'}}/> </Link>
                </div>
                <div className='navbasket'>
                    <Link to='/basket'> <img src='/basket-logo.png' alt='Basket' style={{ width: '42px', height:'42px'}}/> </Link>
                </div>
                <div className='sign-up'>
                    <Link to='/register'>SIGN UP</Link>
                </div>
                <div className='sign-in'>
                    <Link to='/login'>SIGN IN</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;