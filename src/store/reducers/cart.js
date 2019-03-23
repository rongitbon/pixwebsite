import * as actionTypes from '../actions/actionType.js';
import axios from 'axios';

const initialState = {
    cart: []
};

const cart = (state = initialState, action) => {
    const UpdateState = {...state};

    switch (action.type) {

        case actionTypes.ADD_ITEM:
            if(!(UpdateState.cart.find(item => item.id === action.item.id))){
                UpdateState.cart.push(action.item);
            }
            return UpdateState;

        case actionTypes.REMOVE_ITEM:
            UpdateState.cart = UpdateState.cart.filter(item => item.id !== action.id);
            return UpdateState;

        default:
            return state;
            break;
    }
};

export default cart;