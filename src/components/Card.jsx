import React from 'react';
import { css, cx } from 'emotion';
import styled from '@emotion/styled';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  GiSpades, GiClubs, GiHearts, GiDiamonds,
} from 'react-icons/gi';

const Wrapper = styled.div`
  background: turquoise;
`;
const WrapperDos = styled.div({
  borderRadius: '10vh',
});

const CardWrapper = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    width: 120px;
    height: 200px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;
const iconStyles = {
  backgroundColor: 'red',
};

const Card = (props) => {
  const { suit, rank } = props;
  return (
    <CardWrapper>
      {(suit === 'spades') && <GiSpades css={iconStyles} />}
      {(suit === 'diamonds') && <GiDiamonds />}
      {(suit === 'hearts') && <GiHearts />}
      {(suit === 'clubs') && <GiClubs />}
      <p>
        Value:
        {rank}
      </p>
      <p>
        Suit:
        {suit}
      </p>
    </CardWrapper>
  );
};

export default Card;
