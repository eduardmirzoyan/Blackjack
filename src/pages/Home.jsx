import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <br />
        <Link to="/cards">Cards</Link>
        <br />
        <Link to="/game">Game</Link>

      </div>
    );
  }
}

export default Home;
