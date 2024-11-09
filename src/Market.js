import React, { useState, useEffect } from 'react';
import BookDetails from './BookDetails';
import { Link, useHistory } from 'react-router-dom';
import './styles/Market.css';
import Axios from 'axios';

const Market = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get('http://localhost:3001')
      .then((res) => {
        if (res.data.status === 'Success') {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.error);
          history.push('/login');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [history]);

  useEffect(() => {
    fetch('http://localhost:3001/api/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched books:', data);
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError(error.message);
      });

    const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    console.log('Stored selected books:', storedSelectedBooks);
    setSelectedBooks(storedSelectedBooks);
  }, []);

  const handleSelectBook = (bookId) => {
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, isSelected: true } : book
    );
    setBooks(updatedBooks);

    const newSelectedBooks = [...selectedBooks];
    const bookIndex = newSelectedBooks.findIndex((item) => item.id === bookId);

    if (bookIndex > -1) {
      newSelectedBooks[bookIndex].quantity += 1;
    } else {
      newSelectedBooks.push({ id: bookId, quantity: 1 });
    }

    setSelectedBooks(newSelectedBooks);
    localStorage.setItem('selectedBooks', JSON.stringify(newSelectedBooks));
  };

  const handleCheckout = () => {
    history.push({
      pathname: '/basket',
      state: { selectedBooks },
    });
  };

  return (
    <div className="market">
      {auth ? (
        <div>
          <h2>- Our Books -</h2>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {message && <p style={{ color: 'orange' }}>{message}</p>}
          <div className="booklist">
            <BookDetails books={books} handleSelectBook={handleSelectBook} />
          </div>
          <div className="basket-btn">
            <button onClick={handleCheckout}>Basket</button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{}</h3>
          <h3>Login Now</h3>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Market;