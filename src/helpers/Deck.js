class Deck {
    constructor() {
        const suit = ['hearts', 'spades', 'diamonds', 'clubs'];
        const rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.deck = [];
        for (const suitIndex in suit) {
            for(const rankIndex in rank){
                this.deck.push({rank: rank[rankIndex], suit: suit[suitIndex]});
            }
        }
    }   

    getCard() {
        const randomIndex = Math.floor(Math.random() * this.deck.length);
        const removedCards = this.deck.splice(randomIndex, 1);
        return removedCards[0];
    }

    getSize() {
        return this.deck.length;
    }
}

export default Deck;