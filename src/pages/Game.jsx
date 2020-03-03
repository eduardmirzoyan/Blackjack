import React, { Component } from 'react';
import styled from '@emotion/styled';
import Card from '../components/Card';
import Deck from '../helpers/Deck';
import { Link } from 'react-router-dom';

/** @jsx jsx */
import { css, cx } from 'emotion';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const TableFelt = styled.div({
    backgroundImage: 'radial-gradient(#006600 10%,  #003300 90%)',
    height: 'auto',
    minHeight: '100vh',
    width: '100%',
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
});

const betStyle = {
    textAlign: 'center',
};

class Game extends Component {
    
    // Winner, 0 if no winner, 1 if player wins, -1 if dealer wins
    state = {
        currentBet: 0,
        currentDeck: new Deck(),
        currentPlayerCards: [],
        currentDealerCards: [],
        currentPlayerBalance: 1000,
        roundStarted: false,
        playerTurn: true,
        playerBusted: false,
        dealerBusted: false,
        winner: 0,
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
            this.drawCard('p', 2);
            this.drawCard('d', 2);
    
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
        this.drawCard('p', 1);
    }

    stand = () => {
        this.setState({playerTurn: false});

        let total = this.dealerTotal();

        let drawnCards = [];
        while(total < 17) {
            let card = this.state.currentDeck.getCard();
            drawnCards = drawnCards.concat(card);
            total += card.blackjackValue;
        }
        this.addCard(drawnCards);
        this.checkWin();
    }

    clearTable = () => {
        this.setState({
            currentDeck: new Deck(),
            currentPlayerCards: [],
            currentDealerCards: [],
            roundStarted: false,
            playerBusted: false,
            dealerBusted: false,
            playerTurn: true,
            winner: 0,
        });
    }

    // Helper function
    drawCard(user, amount) {
        if(user === 'p') {
            for (let i = 0; i < amount; i++) {
                let newCard = this.state.currentDeck.getCard();
                this.setState((prevState) => ({
                   currentPlayerCards: prevState.currentPlayerCards.concat(newCard),
                }), () => ( this.checkWin()) );
                // Callback ^^^
            }
            
        }
        if(user === 'd'){
            for (let i = 0; i < amount; i++) {
                this.setState((prevState) => ({
                    currentDealerCards: prevState.currentDealerCards.concat( prevState.currentDeck.getCard())
                }), () => ( this.checkWin()) );  
                // Callback ^^^
            }
        }
        this.forceUpdate();
    }

    // Helper function
    addCard(card) {
        this.setState((prevState) => ({
            currentDealerCards: prevState.currentDealerCards.concat(card),
         }), () => ( this.checkWin()) );
    }

    // Helper function
    checkPlayerBust() {
        let total = 0;
        for (let i = 0; i < this.state.currentPlayerCards.length; i++) {
            total += this.state.currentPlayerCards[i].blackjackValue;
        }
        if(total > 21){
            this.setState({playerBusted: true})
        }
    }

    // Helper function
    checkDealerBust() {
        let total = 0;
        for (let i = 0; i < this.state.currentDealerCards.length; i++) {
            total += this.state.currentDealerCards[i].blackjackValue;
        }
        if(total > 21){
            this.setState({dealerBusted: true})
        }
    }

    checkWin() {
        let pTotal = 0;
        for (let i = 0; i < this.state.currentPlayerCards.length; i++) {
            pTotal += this.state.currentPlayerCards[i].blackjackValue;
        }
        
        let dTotal = 0;
        for (let i = 0; i < this.state.currentDealerCards.length; i++) {
            dTotal += this.state.currentDealerCards[i].blackjackValue;
        }

        if(pTotal === 21) {
            this.setState((prevState) => ({
                currentPlayerBalance: prevState.currentPlayerBalance + prevState.currentBet,
                winner: 1,
            }));
            return;
        }
        if(dTotal === 21) {
            this.setState((prevState) => ({
                currentPlayerBalance: prevState.currentPlayerBalance - prevState.currentBet,
                winner: -1,
            }));
            return;
        }

        if(pTotal > 21) {
            this.setState((prevState) => ({
                playerBusted: true,
                currentPlayerBalance: prevState.currentPlayerBalance - prevState.currentBet,
                winner: -1,
            }));
            return;
        }
        if(dTotal > 21) {
            this.setState((prevState) => ({
                dealerBusted: true,
                currentPlayerBalance: prevState.currentPlayerBalance + prevState.currentBet,
                winner: 1,
            }));
            return;
        }
        if(!this.state.playerTurn) {
            if(pTotal > dTotal) {
                this.setState((prevState) => ({
                    currentPlayerBalance: prevState.currentPlayerBalance + prevState.currentBet,
                    winner: 1,
                }));
                return;
            }
            else if(pTotal < dTotal) {
                this.setState((prevState) => ({
                    currentPlayerBalance: prevState.currentPlayerBalance - prevState.currentBet,
                    winner: -1,
                }));
                return;
            }
            else {
                alert('tie lol');
                return;
            }
        }
    }

    // Game checks

    // Helper function
    dealerTotal() {
        let total = 0;
        this.state.currentDealerCards.map( (card) => ( total += card.blackjackValue) )
        return total;
    }

    dealerConcealedTotal() {
        return this.state.currentDealerCards.reduce( (total, card, index) => ((index === 0) ? total : total + card.blackjackValue), 0);
    }

    // Helper function
    playerTotal() {
        let total = 0;
        this.state.currentPlayerCards.map( (card) => ( total += card.blackjackValue) )
        return total;
    }

    // Helper function
    hasAce(array) {
        for (let i = 0; i < array.length; i++) {
            if(array[i].rank === 1 ) {
                return true;
            }
        }
        return false;
    }

    // Helper function
    displayDealerHandValue() {
        if(this.state.dealerBusted) {
            return this.dealerTotal() + ' BUST';
        }
        if(this.hasAce(this.state.currentDealerCards)) {
            return this.dealerTotal() + ' / ' + (this.dealerTotal() + 10);
        }
        else {
            if(this.state.winner === 0) {
                if(this.state.currentDealerCards.length === 0) {
                    return 0;
                }
                return this.dealerConcealedTotal();
            }
            return this.dealerTotal();
        }
    }

    // Helper function
    displayPlayerHandValue() {
        if(this.state.playerBusted) {
            return this.playerTotal() + ' BUST';
        }
        if(this.hasAce(this.state.currentPlayerCards)) {
            return this.playerTotal() + ' / ' + (this.playerTotal() + 10);
        }
        else {
            return this.playerTotal();
        }
    }

    render() {

        return (

            <TableFelt>
            <DealerSection>
                {this.state.currentDealerCards.map((card, idx) => (
                    <Card suit={card.suit} rank={card.rank} revealed={(idx === 0) ? ((!this.state.playerTurn) ? true : false) : true} key={idx} />
                ))}

                <p style={{margin: 0}}>{ this.displayDealerHandValue() } </p>
                <p style={{margin: 0}}>{ (this.state.winner === 1 ? 'Player wins' : '') || (this.state.winner === -1 ? 'Dealer wins' : '') }</p>
            </DealerSection>

            <div css={betStyle}>
                <BetPool> 
                    ${this.state.currentBet}
                </BetPool>
            </div>
            
            <PlayerSection>
                {this.state.currentPlayerCards.map( (card, idx) => (
                    <Card suit={card.suit} rank={card.rank} revealed={true} key={idx} />
                ))}

                <p style={{margin: 0}}>{ this.displayPlayerHandValue() }</p>
            </PlayerSection>

            <ActionButton onClick={() => (this.dealCards())} css={{ display: (this.state.roundStarted ? 'none' : 'block') }}>Deal</ActionButton>
            <ActionButton onClick={() => (this.hit())} css={{display: (((this.state.winner !== 0) || !this.state.roundStarted) ? 'none' : 'block')}}>Hit</ActionButton>
            <ActionButton onClick={() => (this.stand())} css={{display: (((this.state.winner !== 0) || !this.state.roundStarted) ? 'none' : 'block')}}>Stand</ActionButton>
            <ActionButton onClick={() => (this.resetBet())} css={{ display: (this.state.roundStarted ? 'none' : 'block') }} >Reset Bet</ActionButton>
            <ActionButton onClick={() => (this.clearTable()) } css={{ display: ((this.state.playerBusted || this.state.dealerBusted || (this.state.winner !== 0)) ? 'block' : 'none') }}>New Round</ActionButton>

            <ChipTracker>
                <Chip onClick={() => (this.raiseBet(1))} color={'gray'}>$1</Chip>
                <Chip onClick={() => (this.raiseBet(5))} color={'red'}>$5</Chip>
                <Chip onClick={() => (this.raiseBet(10))} color={'blue'}>$10</Chip>
                <Chip onClick={() => (this.raiseBet(25))} color={'green'}>$25</Chip>
                <Chip onClick={() => (this.raiseBet(100))} color={'black'}>$100</Chip>
            </ChipTracker>

            <PlayerBalance>
                ${this.state.currentPlayerBalance}
            </PlayerBalance>
            
        </TableFelt>
        );
    }
}



export default Game;