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

const CardBackWrapper = styled.div`
    color: red;
    border: 10px solid white;
    position: relative;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    width: 120px;
    height: 200px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`

const CardWrapper = styled.div`
    position: relative;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    width: 120px;
    height: 200px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;
const iconStyles = {
};

const redIconSyles = {
  color: 'red',
}

const rankSyles = {
  fontSize: 25,
  margin: 0,
  width: '100%',
};

const iconStylesBottom = {
  position: 'absolute',
  bottom: 43,
  right: 10,
};

const redIconStylesBottom = {
  color: 'red',
  position: 'absolute',
  bottom: 43,
  right: 10,
};

const rankSylesBottom = {
  position: 'absolute',
  bottom: 10,

  textAlign: 'right',
  fontSize: 25,
  margin: 0,
  width: 120,
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
  const { suit, rank } = props;
  return (
    <CardWrapper>
      <p css={rankSyles}>
        {translateRank(rank)}
      </p>
      
      {(suit === 'spades') && <GiSpades css={iconStyles} />}
      {(suit === 'diamonds') && <GiDiamonds css={redIconSyles} />}
      {(suit === 'hearts') && <GiHearts css={redIconSyles} />}
      {(suit === 'clubs') && <GiClubs css={iconStyles} />}

      <br/>

      {(suit === 'spades') && <GiSpades css={iconStylesBottom} />}
      {(suit === 'diamonds') && <GiDiamonds css={redIconStylesBottom} />}
      {(suit === 'hearts') && <GiHearts css={redIconStylesBottom} />}
      {(suit === 'clubs') && <GiClubs css={iconStylesBottom} />}

      <p css={rankSylesBottom}>
        {translateRank(rank)}
      </p>

    </CardWrapper>
  );



  function backSide() {
    return (
      <CardBackWrapper>
        
      </CardBackWrapper>
    );
  }
};

export default Card;
