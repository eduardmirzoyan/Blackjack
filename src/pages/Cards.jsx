import React, { Component } from 'react';
import styled from '@emotion/styled';
import Card from '../components/Card';
import cardsArray from '../helpers/cardsArray';
import { Link } from 'react-router-dom';

const CardContainer = styled.div({
  padding: 20,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridRowGap: 30,
});

class Cards extends Component {
  render() {
    return (
      <div>
        This is going to be my cards page. <br/>
        Click <Link to="/">here</Link> to back to the homepage.

        <CardContainer>
          {cardsArray.map((card, idx) => (
            <div>
              <Card suit={card.suit} rank={card.rank} key={idx} />
              <p>
                Index:
                {idx}
              </p>
            </div>
          ))}
        </CardContainer>
      </div>
    );
  }
}

export default Cards;
