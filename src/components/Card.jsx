import React from 'react';
import { css, cx } from 'emotion';
import styled from '@emotion/styled';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  GiSpades, GiClubs, GiHearts, GiDiamonds,
} from 'react-icons/gi';
import cardBackImage from '../assets/images/cardBack.png';

const CardWrapper = styled.div`
  display: inline-block;
  background-color: white;
  margin: 10px;
  
  text-align: left;
  position: relative;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  width: 120px;
  height: 200px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;

const CardFront = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

const CardBack = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 5;
  background-image: url(${cardBackImage});
  background-size: cover;
  background-repeat: no-repeat;
  visibility: ${props => props.revealed ? 'visible' : 'hidden'};
`;

const blackIcon = {
};

const redIcon = {
  color: 'red',
}

const rankSyles = {
  fontSize: 25,
  margin: 0,
  width: '100%',
  float: 'left',
};

const rankSylesBottom = {
  position: 'absolute',
  bottom: 10,

  textAlign: 'right',
  fontSize: 25,
  margin: 0,
  width: 120,
};

const blackIconBottom = {
  position: 'absolute',
  bottom: 43,
  right: 10,
};

const redIconBottom = {
  color: 'red',
  position: 'absolute',
  bottom: 43,
  right: 10,
};

const translateRank = (rank) => {
  switch(rank) {
    case 1:
      return 'A';
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
    default:
      return rank;
  }
}

const Card = (props) => {
  const { suit, rank, revealed } = props;
  
  return (
    
    <CardWrapper>
      <CardBack revealed={!revealed} />

      <CardFront>
        <p css={rankSyles}>
          {translateRank(rank)}
        </p>
        
        {(suit === 'spades') && <GiSpades css={blackIcon} />}
        {(suit === 'diamonds') && <GiDiamonds css={redIcon} />}
        {(suit === 'hearts') && <GiHearts css={redIcon} />}
        {(suit === 'clubs') && <GiClubs css={blackIcon} />}

        <br/>

        {(suit === 'spades') && <GiSpades css={blackIconBottom} />}
        {(suit === 'diamonds') && <GiDiamonds css={redIconBottom} />}
        {(suit === 'hearts') && <GiHearts css={redIconBottom} />}
        {(suit === 'clubs') && <GiClubs css={blackIconBottom} />}

        <p css={rankSylesBottom}>
          {translateRank(rank)}
        </p>
      </CardFront>
    </CardWrapper>
  );
};

export default Card;
