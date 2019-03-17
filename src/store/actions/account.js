import * as actionTypes from './actionType.js';
import * as form from './form.js';
import axios from 'axios';

export const setUserInfo = (userInfo) => {
    return {
        type: actionTypes.SET_USER_INFO,
        userInfo: userInfo
    };
};


export const signupFailed = (error) => {
    return {
        type: actionTypes.SIGNUP_FAILED,
        error: error,
    };
};

export const login = (email, password) => {

    return (dispatch) => {
        dispatch(form.startLoading('login'));
        axios.post('http://localhost:3001/login', {
            email: email,
            password: password
        })
        .then(user => {
            dispatch(setUserInfo(user.data));
            dispatch({type: actionTypes.CLOSE_LOGIN_FORM});
            dispatch(form.stopLoading('login'));
        })
        .catch(error_msg => {
            dispatch(form.compFailed(error_msg, "login"));
            dispatch(form.stopLoading('login'));
        });
    };
};

export const signup = (email, nickname, password) => {
    return (dispatch) => {
        dispatch(form.startLoading('signup'));
        axios.post('http://localhost:3001/signup', {
            email: email,
            nickname: nickname,
            password: password
        })
        .then(user => {
            dispatch(setUserInfo(user.data));
            dispatch({type: actionTypes.CLOSE_LOGIN_FORM});
            dispatch(form.stopLoading('signup'));
        })
        .catch(error_msg => {
            dispatch(form.compFailed(error_msg, "signup"));
            dispatch(form.stopLoading('signup'));
        });
    };
}

export const signout = () => {
    return {
        type: actionTypes.SIGNOUT
    };
};