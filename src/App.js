import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import Market from "./Market";
import Basket from "./Basket";
import Checkout from "./Checkout";

function App() {
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    setSelectedBooks(storedSelectedBooks);
  }, []);

  const getTotalBooksInBasket = () => {
    return selectedBooks.reduce((total, { quantity }) => total + quantity, 0);
  };

  return (
    <Router>
      <div className="App">
        <Navbar totalBooksInBasket={getTotalBooksInBasket()} />
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route exact path='/'>
            <Market />
          </Route>
          <Route path='/basket'>
            <Basket />
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;