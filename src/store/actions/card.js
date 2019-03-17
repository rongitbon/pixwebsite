import * as actionTypes from './actionType.js';
import * as form from './form.js';
import axios from 'axios';

export const addCardToTheDeck = (card) => {
    return {
        type: actionTypes.ADD_CARD_TO_THE_DECK,
        card: card
    }
}

export const addCard = (imgpath, itemselection, itemname, itemdescription, itemprice, userId) => {
    return (dispatch) => {
        dispatch(form.startLoading('editItem'));
        console.log(imgpath, itemselection, itemname, itemdescription, itemprice, userId);
        axios.post('http://localhost:3001/addcard', {
            name: itemname,
            description: itemdescription,
            price: itemprice,
            character_type: itemselection,
            image_path: imgpath,
            owner_id: userId
        })
        .then(card => {
            dispatch(addCardToTheDeck(card.data[0]));
            console.log(card);
            dispatch({type: actionTypes.CLOSE_EDIT_ITEM_FORM});
            dispatch(form.stopLoading('editItem'));
        })
        .catch(error_msg => {
            //dispatch(signupFailed(error))
            dispatch(form.stopLoading('editItem'));
            dispatch(form.compFailed(error_msg, "editItem"));
        });
    }
};

export const setUserDeck = (deck) => {
    return {
        type: actionTypes.SET_USER_DECK,
        deck: deck
    }
} 

export const getUserCards = (userId) => {
    return (dispatch) => {
        dispatch(form.startLoading('cardScroll'));
        console.log(userId + "hi");
        axios.post('http://localhost:3001/get_user_cards', {
            owner_id: userId
        })
        .then(card => {
            dispatch(setUserDeck(card.data));
            dispatch(form.stopLoading('cardScroll'));
        })
        .catch(error_msg => {
            //dispatch(signupFailed(error))
            dispatch(form.compFailed(error_msg, "cardScroll"));
            dispatch(form.stopLoading('cardScroll'));
        });
    }
};

export const setCheapestCards = (cards, character_type) => {
    return {
        type: actionTypes.SET_CHEAPEST_CARDS,
        cards: cards,
        character_type: character_type
    }
} 

export const getCheapestCards = (character_type) => {
    return (dispatch) => {
        console.log(character_type + "hi");
        axios.post('http://localhost:3001/get_cheapest_cards', {
            character_type: character_type
        })
        .then(card => {
            dispatch(setCheapestCards(card.data, character_type));
        })
        .catch(error => 
            //dispatch(signupFailed(error))
            console.log(error)
            );
    }
};

export const setBookCards = (cards) => {
    return {
        type: actionTypes.SET_BOOK_CARDS,
        cards: cards
    }
} 

export const getCardsByTheMenu = (time, characters, price) => {
    return (dispatch) => {
        dispatch(form.startLoading('cardBook'));
        axios.post('http://localhost:3001/get_cards_by_menu', {
            time: time,
            characters: characters,
            price: price
        })
        .then(card => {
            dispatch(setBookCards(card.data));
            dispatch(form.stopLoading('cardBook'));
        })
        .catch(error_msg => {
            //dispatch(signupFailed(error))
            dispatch(form.compFailed(error_msg, "cardBook"));
            dispatch(form.stopLoading('cardBook'));
        });
    }
};

export const getCardsByName = (name) => {
    return (dispatch) => {
        dispatch(form.startLoading('cardBook'));
        axios.post('http://localhost:3001/get_cards_by_name', {
            name: name.trim()
        })
        .then(card => {
            dispatch(setBookCards(card.data));
            dispatch(form.stopLoading('cardBook'));
        })
        .catch(error_msg => {
            //dispatch(signupFailed(error))
            dispatch(form.compFailed(error_msg, "cardBook"));
            dispatch(form.stopLoading('cardBook'));
        });
    }
};

export const removeCard = (id) => {
    return {
        type: actionTypes.DELETE_CARD,
        id: id
    }
}

export const deleteCard = (id) => {
    console.log(id)
    return (dispatch) => {
        axios.delete('http://localhost:3001/deletecard', {
            data: {
                id: id
            }
        })
        .then(() => {
            dispatch(removeCard(id));
        })
        .catch(error => 
            //dispatch(signupFailed(error))
            console.log(error)
        );
    }
}