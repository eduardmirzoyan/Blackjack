import React from 'react';
import { css, cx } from 'emotion';
import styled from '@emotion/styled';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const CardBackWrapper = styled.div`
  display: inline-block;
  background-image: url(https://i.pinimg.com/originals/8d/81/0e/8d810ebc5f83549e0dfc9caf65f12c60.png);
  background-size: cover;
  background-repeat: no-repeat;
  margin: 10px;

  text-align: left;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 120px;
  height: 200px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`;

const CardBack = () => {
    return (
      <CardBackWrapper>
  
      </CardBackWrapper>
    )
}

export default CardBack;