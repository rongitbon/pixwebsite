import * as actionTypes from '../actions/actionType.js';
import axios from 'axios';

const initialState = {
    loggedIn: false,
    user: {},
    errorLogin: false,
    errorSignup: false
};

const account = (state = initialState, action) => {
    const UpdateState = {...state};

    switch (action.type) {
        case actionTypes.SET_USER_INFO:
            UpdateState.user = action.userInfo;
            UpdateState.loggedIn = true;
            UpdateState.errorLogin = false; 

            return UpdateState;

        case actionTypes.SIGNOUT:
            UpdateState.user = {};
            UpdateState.loggedIn = false;

            return UpdateState;

        case actionTypes.SIGNUP_FAILED:
            console.log(action.error)
            UpdateState.errorLogin = true; 

            return UpdateState;
            
        case actionTypes.LOGIN_FAILED:
            console.log(action.error)
            UpdateState.errorSignup = true; 

            return UpdateState;


        default:
            return state;
            break;
    }
};

export default account;