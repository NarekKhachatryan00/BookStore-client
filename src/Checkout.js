import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles/Checkout.css'

const Checkout = () => {
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [books, setBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const selectedBooks = useMemo(() => JSON.parse(localStorage.getItem('selectedBooks')) || [], []);
  
  useEffect(() => {
    if (selectedBooks.length === 0) return;

    const fetchBooks = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/books'); 
        setBooks(response.data);  
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Error fetching books');
      }
    };

    fetchBooks();
  }, [selectedBooks]);


  const getTotalPrice = useCallback(() => {
    return selectedBooks.reduce((total, { id, quantity }) => {
      const book = books.find(book => book.id === id);
      if (!book || !book.price) {
        return total;
      }
      return total + (book.price * quantity);
    }, 0);
  }, [books, selectedBooks]); 

  useEffect(() => {
    if (books.length > 0) {
      setTotalPrice(getTotalPrice());
    }
  }, [books, selectedBooks, getTotalPrice]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address || !paymentMethod) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response2 = await Axios.get('http://localhost:3001', { withCredentials: true });

      const response = await Axios.post(
        'http://localhost:3001/api/order',
        {
          username: response2.data.name, 
          address,
          payment_method: paymentMethod,
          total_price: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.data.status === 'Success') {
        console.log('Order placed successfully!');
        history.push('/');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('An error occurred while placing your order.');
    }
  };

  return (
    <div className='checkout'>
        <div className="checkoutBox">
        <h2>Checkout</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="address">Shipping Address:</label> <br />
            <input
                id="address"
                name="address"
                autoComplete='off'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Payment Method:</label>
            <div>
                <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cash">Cash</label>
            </div>
            <div>
                <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="card">Card</label>
            </div>
            </div>
            <div>
            <h3>Total Price: {totalPrice.toFixed(2)} $</h3>
            </div>
            <button type="submit">Buy</button>
        </form>
        </div>
    </div>
  );
};

export default Checkout;