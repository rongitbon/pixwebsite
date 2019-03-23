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

export const updateProfile = (id, pre_email, nickname, description, email, image_path) => {
    return (dispatch) => {
        dispatch(form.startLoading('editProfile'));
        console.log(id, pre_email, nickname, description, email, image_path);
        axios.post('http://localhost:3001/update_profile', {
            nickname: nickname,
            pre_email: pre_email,
            description: description,
            email: email,
            image_path: image_path,
            id: id
        })
        .then(user => {
            dispatch(updateUserProfile(user.data));
            console.log(user);
            dispatch({type: actionTypes.CLOSE_EDIT_PROFILE_FORM});
            dispatch(form.stopLoading('editProfile'));
        })
        .catch(error_msg => {
            //dispatch(signupFailed(error))
            dispatch(form.stopLoading('editProfile'));
            dispatch(form.compFailed(error_msg.response.data, "editProfile"));
        });
    }
};

export const updateUserProfile = (user) => {
    return {
        type: actionTypes.UPDATE_PROFILE,
        user: user
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
            dispatch(form.compFailed(error_msg.response.data, "login"));
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
            dispatch(form.compFailed(error_msg.response.data, "signup"));
            dispatch(form.stopLoading('signup'));
        });
    };
}

export const signout = () => {
    return {
        type: actionTypes.SIGNOUT
    };
};