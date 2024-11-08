import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import Market from "./Market";
import Basket from "./Basket";
import Checkout from "./Checkout";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
