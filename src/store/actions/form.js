import * as actionTypes from './actionType.js';

export const startLoading = (comp, character_type) => {
    return {
        type: actionTypes.START_LOADING,
        comp: comp,
        character_type: character_type?character_type:null
    };
};

export const stopLoading = (comp, character_type) => {
    return {
        type: actionTypes.STOP_LOADING,
        comp: comp,
        character_type: character_type?character_type:null
    };
};

export const compFailed = (error_msg, comp, character_type) => {
    return {
        type: actionTypes.OPEN_ERROR_MESSAGE,
        comp: comp,
        character_type: character_type?character_type:null,
        error_msg: error_msg
    };
};