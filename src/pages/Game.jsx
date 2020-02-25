import React, { Component } from 'react';
import styled from '@emotion/styled';
import Card from '../components/Card';
import CardBack from '../components/CardBack';
import Deck from '../helpers/Deck';
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

    minHeight: 295,
});

const PlayerSection = styled.div({
    position: 'relative',
    display: 'block',
    alignItems: 'center',
    margin: '0 auto',
    textAlign: 'center',
    padding: 20,

    minHeight: 295,
});

const ChipTracker = styled.div({
    position: 'absolute',
    bottom: 0,
})

const PlayerBalance = styled.div({
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 0,
    padding: 10,
    fontSize: 40,
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


    function dealerTotal() {
        let total = 0;
        props.dealerCards.map( (card) => ( total += card.rank) )
        return total;
    }

    function playerTotal() {
        let total = 0;
        props.playerCards.map( (card) => ( total += card.rank) )
        return total;
    }

    return (
        <TableFelt>
            <DealerSection>
                {props.dealerCards.map((card, idx) => (
                    <Card suit={card.suit} rank={card.rank} revealed={(idx === 0) ? ((props.playerBusted || props.dealerBusted) ? true : false) : true} key={idx} />
                ))}

                <p style={{margin: 0}}>{ (props.dealerBusted ? 'BUST' : dealerTotal()) } </p>
            </DealerSection>

            <div css={betStyle}>
                <BetPool> 
                    ${props.currentBet}
                </BetPool>
            </div>
            
            <PlayerSection>
                {props.playerCards.map( (card, idx) => (
                    <Card suit={card.suit} rank={card.rank} revealed={true} key={idx} />
                ))}

                <p style={{margin: 0}}>{ (props.playerBusted ? 'BUST' : playerTotal()) }</p>
            </PlayerSection>

            <ActionButton onClick={props.dealCards} disabled={props.roundStarted}>Deal</ActionButton>
            <ActionButton onClick={props.hit} disabled={props.playerBusted || props.dealerBusted}>Hit</ActionButton>
            <ActionButton onClick={props.stand} disabled={(props.dealerBusted ? true : false)}>Stand</ActionButton>
            <ActionButton onClick={props.resetBet} disabled={props.roundStarted}>Reset Bet</ActionButton>
            <ActionButton onClick={props.clearTable}>New Round</ActionButton>

            <ChipTracker>
                <Chip onClick={() => (props.raiseBet(1))} color={'gray'}>$1</Chip>
                <Chip onClick={() => (props.raiseBet(5))} color={'red'}>$5</Chip>
                <Chip onClick={() => (props.raiseBet(10))} color={'blue'}>$10</Chip>
                <Chip onClick={() => (props.raiseBet(25))} color={'green'}>$25</Chip>
                <Chip onClick={() => (props.raiseBet(100))} color={'black'}>$100</Chip>
            </ChipTracker>

            <PlayerBalance>
                ${props.balance}
            </PlayerBalance>
            
        </TableFelt>
    );
}


class Game extends Component {
    
    state = {
        currentBet: 0,
        currentDeck: new Deck(),
        currentPlayerCards: [],
        currentDealerCards: [],
        currentPlayerBalance: 1000,

        roundStarted: false,
        playerBusted: false,
        dealerBusted: false,

        playersTurn: true,
    };

    raiseBet = (value) => {
        this.setState((prevState) => ({
            currentBet: prevState.currentBet + value,
        }));
    }

    resetBet = () => {
        this.setState({
            currentBet: 0,
            roundStarted: false,
        });
    }

    dealCards = () => {

        if(this.state.currentBet > 0) {
            if(this.state.currentBet > this.state.currentPlayerBalance){
                alert("You do not have enough money.");
                return;
            }
            this.setState({
                roundStarted: true,
            });
            this.addCard('p', 2);
            this.addCard('h', 2);
    
            if(this.state.currentDeck.getSize() <= 10) {
                this.setState({
                    currentDeck: new Deck(),
                })
            }
        } else {
            alert("You must place a bet before playing.");
        }
        
    };

    hit = () => {
        this.addCard('p', 1);
    }

    stand = () => {
        this.addCard('h', 1);
    }

    clearTable = () => {
        this.setState({
            currentPlayerCards: [],
            currentDealerCards: [],
            roundStarted: false,
            playerBusted: false,
            dealerBusted: false,
        });
    }

    addCard(user, amount) {
        if(user === 'p') {
            for (let i = 0; i < amount; i++) {
                this.setState((prevState) => ({
                   currentPlayerCards: prevState.currentPlayerCards.concat( prevState.currentDeck.getCard())
                }), () => ( this.checkPlayerBust(this.state.currentPlayerCards)) );
                // Callback ^^^
            }
        }
        if(user === 'h'){
            for (let i = 0; i < amount; i++) {
                this.setState((prevState) => ({
                    currentDealerCards: prevState.currentDealerCards.concat( prevState.currentDeck.getCard())
                }), () => ( this.checkDealerBust(this.state.currentDealerCards)) );  
            }
        }
    }

    checkPlayerBust(array) {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i].rank;
        }
        if(total > 21){
            this.setState((prevState) => ({
                playerBusted: true,
                currentPlayerBalance: prevState.currentPlayerBalance - prevState.currentBet,
            }));
        }
    }

    checkDealerBust(array) {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i].rank;
        }
        if(total > 21){
            this.setState((prevState) => ({
                dealerBusted: true,
                currentPlayerBalance: prevState.currentPlayerBalance + prevState.currentBet,
            }));
        }
    }

    render() {
        return (
            <div>
                <Table dealerBusted={this.state.dealerBusted} playerBusted={this.state.playerBusted} roundStarted={this.state.roundStarted} balance={this.state.currentPlayerBalance} clearTable={this.clearTable} hit={this.hit} stand={this.stand} dealCards={this.dealCards} currentBet={this.state.currentBet} resetBet={this.resetBet} raiseBet={this.raiseBet} dealerCards={this.state.currentDealerCards} playerCards={this.state.currentPlayerCards} /> 
            </div>
        );
    }
}



export default Game;