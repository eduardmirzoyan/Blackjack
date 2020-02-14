import React, { Component } from 'react';
import styled from '@emotion/styled';
import Card from '../components/Card';
import cardsArray from '../helpers/cardsArray';
import { Link } from 'react-router-dom';

import { css, cx } from 'emotion';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const TableFelt = styled.div({
    backgroundImage: 'radial-gradient(#006600 10%,  #003300 90%)',
    height: '100vh',
    width: '100vw',
    position: 'relative',
});

const CardFrame = styled.div`
    border: 5px solid rgba(255, 255, 255, .3);
    padding: 10px;
    border-radius: 10px;
    width: 120px;
    height: 200px;
    margin: 0 auto;
    margin-top: 20px;
    display: block;
    vertical-align: middle;
`;

const ActionButton = styled.button({
    width: 120,
    margin: '0 auto',
    marginTop: 15,
    textAlign: 'center',
    cursor: 'pointer',
    display: 'block',
    padding: 10,
});

const DealerSection = styled.div({
    position: 'relative',
    display: 'block',
    alignItems: 'center',
    margin: '0 auto',
});

const PlayerSection = styled.div({
    position: 'relative',
    display: 'block',
    alignItems: 'center',
    margin: '0 auto',
});

const ChipTracker = styled.div({
    position: 'absolute',
    bottom: 0,
})

const Chip = styled.button( {
    color: 'black',
    backgroundColor: 'white',
    border: '5px solid black',
    borderRadius: '50%',
    borderStyle: 'dashed',
    height: 50,
    width: 50,
    float: 'left',
    margin: 10,
    cursor: 'pointer',
},
    (props) => ({borderColor: props.color})
);

const Bet = styled.div({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '5px solid black',
    borderRadius: '50%',
    height: 115,
    width: 115,
    textAlign: 'center',
    fontSize: 30,
    lineHeight: '115px',
    display: 'inline-block',
    verticalAlign: 'middle',
    position: 'absolute',
    top: 50,
    left: 'calc(50% + 100px)',
});



const Table = (props) => {

    return (
        <TableFelt>
            <DealerSection>
                <CardFrame/>
            </DealerSection>

            <PlayerSection>
                <CardFrame/>
                <Bet> ${props.currentBet}</Bet>
            </PlayerSection>

            <ActionButton onClick={props.dealCards}>Deal</ActionButton>
            <ActionButton onClick={props.resetBet}>Reset Bet</ActionButton>

            <ChipTracker>
                <Chip onClick={() => (props.raiseBet(1))} color={'gray'}>$1</Chip>
                <Chip onClick={() => (props.raiseBet(5))} color={'red'}>$5</Chip>
                <Chip onClick={() => (props.raiseBet(10))} color={'blue'}>$10</Chip>
                <Chip onClick={() => (props.raiseBet(25))} color={'green'}>$25</Chip>
                <Chip onClick={() => (props.raiseBet(100))} color={'black'}>$100</Chip>
            </ChipTracker>
            
        </TableFelt>
    );
}

class Game extends Component {

    state = {
        currentBet: 0,
        currentPlayerCards: [],
        currentDealerCards: [],
    };

    raiseBet = (value) => {
        this.setState((prevState) => ({
            currentBet: prevState.currentBet + value,
        }));
    }

    resetBet = () => {
        this.setState({
            currentBet: 0,
        });
    }

    dealCards = () => {
        this.setState((prevState) => ({
            currentPlayerCards: prevState.currentPlayerCards.concat('Value'),
        }));
    };

    render() {
        return (
            <div>
                <Table dealCards={this.dealCards} currentBet={this.state.currentBet} resetBet={this.resetBet} raiseBet={this.raiseBet}/> 
            </div>
        );
    }
}

export default Game;