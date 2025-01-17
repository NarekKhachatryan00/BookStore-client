import React, { useState, useEffect } from 'react';
import BookDetails from './BookDetails';
import { useHistory } from 'react-router-dom';
import './styles/Market.css';
import Axios from 'axios';

const Market = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [error, setError] = useState(null);
  Axios.defaults.withCredentials = true;

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

    // Get the stored selected books from localStorage
    const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    setSelectedBooks(storedSelectedBooks);
  }, []);

  const handleSelectBook = (bookId) => {
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, isSelected: true } : book
    );
    setBooks(updatedBooks);

    // Update selectedBooks state
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

  const getTotalBooksInBasket = () => {
    return selectedBooks.reduce((total, { quantity }) => total + quantity, 0);
  };

  return (
    <div className="market">
      <div>
        <h2>- Our Books -</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <div className="booklist">
          <BookDetails books={books} handleSelectBook={handleSelectBook} />
        </div>
        <div className="basket-btn">
          <button onClick={handleCheckout}>Basket</button>
        </div>
      </div>
    </div>
  );
};

export default Market;