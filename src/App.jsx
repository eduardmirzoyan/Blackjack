import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import logo from './logo.svg';
import './App.css';

// Testing
const text = document.createElement('Hello');

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
