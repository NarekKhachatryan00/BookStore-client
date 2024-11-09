import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './styles/Basket.css';

const Basket = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await Axios.get('http://localhost:3001', { withCredentials: true });
        if (response.data.status === 'Success') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    setSelectedBooks(storedSelectedBooks);

    fetch('http://localhost:3001/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBooks(data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError(error.message);
      });
  }, []);

  const handleDeleteBook = (bookId) => {
    const updatedBooks = selectedBooks
      .map(item =>
        item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    setSelectedBooks(updatedBooks);
    localStorage.setItem('selectedBooks', JSON.stringify(updatedBooks));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      history.push('/login');
    } else {
      history.push('/checkout');
    }
  };

  const getBookDetails = (bookId) => {
    return books.find(book => book.id === bookId) || {};
  };

  const getTotalPrice = () => {
    return selectedBooks.reduce((total, { id, quantity }) => {
      const book = getBookDetails(id);
      return total + (book.price ? book.price * quantity : 0);
    }, 0);
  };

  return (
    <div className="basket">
      <div className="book-selection">
        {selectedBooks && selectedBooks.length > 0 ? (
          selectedBooks.map(({ id, quantity }) => {
            const book = getBookDetails(id);
            return (
              <div key={id} className="idies">
                <h3>{book.title || 'Unknown Title'}</h3>
                <p>Quantity: {quantity}</p>
                <button className="delete-btn" onClick={() => handleDeleteBook(id)}>
                  Discard
                </button>
              </div>
            );
          })
        ) : (
          <p className='empty-side'>
            Your cart is empty.
          </p>
        )}
      </div>
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout <br />
        (Total Price: {getTotalPrice().toFixed(2)} $)
      </button>
    </div>
  );
};

export default Basket;

