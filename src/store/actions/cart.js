import * as actionTypes from './actionType.js';

export const addItem = (item) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.ADD_ITEM,
            item: item
        });
        dispatch({type: actionTypes.OPEN_CART_PAGE});
    }
};

export const removeItem = (id) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.REMOVE_ITEM,
            id: id
        });
    }
};