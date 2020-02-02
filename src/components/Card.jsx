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

const rankSyles = {
  fontSize: 25,
  margin: 0,
  width: '100%',
};

const iconStylesBottom = {
  float: 'right',
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

const Card = (props) => {
  const { suit, rank } = props;
  return (
    <CardWrapper>
      <p css={rankSyles}>
        {rank}
      </p>
      
      {(suit === 'spades') && <GiSpades css={iconStyles} />}
      {(suit === 'diamonds') && <GiDiamonds css={iconStyles} />}
      {(suit === 'hearts') && <GiHearts css={iconStyles} />}
      {(suit === 'clubs') && <GiClubs css={iconStyles} />}

      <br/>

      {(suit === 'spades') && <GiSpades css={iconStylesBottom} />}
      {(suit === 'diamonds') && <GiDiamonds css={iconStylesBottom} />}
      {(suit === 'hearts') && <GiHearts css={iconStylesBottom} />}
      {(suit === 'clubs') && <GiClubs css={iconStylesBottom} />}

      <p css={rankSylesBottom}>
        {rank}
      </p>

    </CardWrapper>
  );
};

export default Card;
