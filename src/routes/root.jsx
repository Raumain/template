import React from 'react';
import logo from '../logo.svg';
import { Outlet, Link } from 'react-router-dom'
import { Counter } from '../features/counter/Counter';
import './App.css';

function Root() {
  return (
    <div className="App">
      <div className="details">
        <Outlet />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          <Link to={"/children"} className="testLink">Route for embed children</Link>
          <br />
          <Link to={"/other"}>Another Route</Link>
          <br />
          <Link to={"/error"}>Error Route</Link>
        </p>
      </header>
    </div>
  );
}

export default Root;
