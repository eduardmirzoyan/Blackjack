import React, { Component } from 'react';
import styled from '@emotion/styled';
import Card from '../components/Card';
import cardsArray from '../helpers/cardsArray';
import { Link } from 'react-router-dom';

/** @jsx jsx */
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
    textAlign: 'center',
    padding: 20,

    minHeight: 275,
});

const PlayerSection = styled.div({
    position: 'relative',
    display: 'block',
    alignItems: 'center',
    margin: '0 auto',
    textAlign: 'center',
    padding: 20,

    minHeight: 275,
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

const BetPool = styled.div({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '5px solid black',
    borderRadius: '50%',
    height: 115,
    width: 115,
    textAlign: 'center',
    fontSize: 30,
    lineHeight: '115px',

    display: 'inline-block',
    // verticalAlign: 'middle',
    // position: 'absolute',
    // top: 50,
    // left: 'calc(50% + 100px)',
});

const betStyle = {
    textAlign: 'center',
};

const Table = (props) => {

    let pTotal = 0;
    let dTotal = 0;

    function dealerTotal() {
        props.dealerCards.map( (card) => ( dTotal += card.rank) )
        return dTotal;
    }

    function playerTotal() {
        props.playerCards.map( (card) => ( pTotal += card.rank) )
        return pTotal;
    }

    return (
        <TableFelt>
            <DealerSection>
                
                {props.dealerCards.map((card, idx) => (
                    <Card suit={card.suit} rank={card.rank} key={idx} />
                ))}

                <p>{dealerTotal()}</p>
            </DealerSection>

            <div css={betStyle}>
                <BetPool> 
                    ${props.currentBet}
                </BetPool>
            </div>
            
            <PlayerSection>
                
                {props.playerCards.map( (card, idx) => (
                    <Card suit={card.suit} rank={card.rank} key={idx} />
                ))}

                <p>{playerTotal()}</p>
            </PlayerSection>

            <ActionButton onClick={props.dealCards}>Deal</ActionButton>
            <ActionButton onClick={props.stand}>Stand</ActionButton>
            <ActionButton onClick={props.resetBet}>Reset Bet</ActionButton>
            <ActionButton onClick={props.clearTable}>Clear Table</ActionButton>

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
            currentPlayerCards: prevState.currentPlayerCards.concat(cardsArray[ Math.floor(Math.random() * 52 + 1 )] ),
        }));
    };

    hit = () => {
        // To be implemented...
    }

    stand = () => {
        this.setState((prevState) => ({
            currentDealerCards: prevState.currentDealerCards.concat(cardsArray[ Math.floor(Math.random() * 52 + 1 )] ),
        }));
    }

    clearTable = () => {
        this.setState({
            currentPlayerCards: [],
            currentDealerCards: [],
        });
    }

    render() {
        return (
            <div>
                <Table clearTable={this.clearTable} stand={this.stand} dealCards={this.dealCards} currentBet={this.state.currentBet} resetBet={this.resetBet} raiseBet={this.raiseBet} dealerCards={this.state.currentDealerCards} playerCards={this.state.currentPlayerCards} /> 
            </div>
        );
    }
}

export default Game;