import * as actionTypes from '../actions/actionType.js';
import axios from 'axios';

const initialState = {
    userCards : [],
    cheapestCards: {},
    load: {
        cheapest : {
            kitten: true,
            robotV1: true,
            monster: true,
            robotV2: true,
        },
        book : true,
        user_cards: true
    }
};

const account = (state = initialState, action) => {
    const UpdateState = {...state};

    switch (action.type) {
        case actionTypes.ADD_CARD_TO_THE_DECK:
            UpdateState.userCards.push(action.card);
            return UpdateState;
        
        case actionTypes.SET_USER_DECK:
            UpdateState.userCards = action.deck;
            return UpdateState;

        case actionTypes.SET_BOOK_CARDS:
            UpdateState.userCards = action.cards;
            UpdateState.load.book = false;
            return UpdateState;

        case actionTypes.SET_CHEAPEST_CARDS:
            UpdateState.cheapestCards[action.character_type] = action.cards;
            UpdateState.load.cheapest[action.character_type] = false;
            return UpdateState;

        case actionTypes.DELETE_CARD:
            UpdateState.userCards = UpdateState.userCards.filter(card => card.id !== action.id);
            console.log(UpdateState);
            UpdateState.load.user_cards = false;
            return UpdateState;

        default:
            return state;
            break;
    }
};

export default account;