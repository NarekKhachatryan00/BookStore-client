import React, { useState } from 'react';
import './styles/BookDetails.css';

const BookDetails = ({ books, handleSelectBook }) => {
  const [buttonText, setButtonText] = useState({});

  const handleButtonClick = (bookId) => {
    handleSelectBook(bookId);

    setButtonText(prevState => ({
      ...prevState,
      [bookId]: 'Added'
    }));

    setTimeout(() => {
      setButtonText(prevState => ({
        ...prevState,
        [bookId]: 'Add'
      }));
    }, 1000);
  };

  return (
    <div className="book-details">
      {books.length > 0 ? (
        books.map(book => (
          <div key={book.id} className="book-preview">
            <img src="/book-logo.png" alt="Book Icon" style={{width: '95px', height: '95px'}}/> 
            <h3>{book.title}</h3>
            <p>{book.content}</p>
            <p><b>Price:</b> {book.price} $</p>
            <button onClick={() => handleButtonClick(book.id)}>
              {buttonText[book.id] || 'Add'}
            </button>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookDetails;