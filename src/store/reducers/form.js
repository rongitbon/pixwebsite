import * as actionTypes from '../actions/actionType.js';

const initialState = {
    loginFrom: false,
    editItemFrom: false,
    editProfileFrom: false,
    cartPage: false,
    message: {open:false, content: null, header: "message"},
    errorForm: {
        login: {error: false, content: null},
        signup: {error: false, content: null},
        editItem: {error: false, content: null},
        editProfile: {error: false, content: null},
        cardScroll: {error: false, content: null},
        cardBook: {error: false, content: null},
        cardList: {
            kitten: {error: false, content: null},
            robotV1: {error: false, content: null},
            monster: {error: false, content: null},
            robotV2: {error: false, content: null},
        }
    },
    loading: {
        login: false,
        singup: false,
        editItem: false,
        editProfile: false,
        cardScroll: false,
        cardBook: false,
        cardList: {
            kitten: false,
            robotV1: false,
            monster: false,
            robotV2: false,
        }
    }
};

const form = (state = initialState, action) => {
    const UpdateState = {...state};

    switch (action.type) {
        case actionTypes.OPEN_LOGIN_FORM:
            UpdateState.loginFrom = true;

            return UpdateState;
        
        case actionTypes.CLOSE_LOGIN_FORM:
            UpdateState.loginFrom = false;

            return UpdateState;

        case actionTypes.OPEN_EDIT_ITEM_FORM:
            UpdateState.editItemFrom = true;

            return UpdateState;
        
        case actionTypes.CLOSE_EDIT_ITEM_FORM:
            UpdateState.editItemFrom = false;

            return UpdateState;

        case actionTypes.OPEN_EDIT_PROFILE_FORM:
            UpdateState.editProfileFrom = true;

            return UpdateState;
        
        case actionTypes.CLOSE_EDIT_PROFILE_FORM:
            UpdateState.editProfileFrom = false;

            return UpdateState;

        case actionTypes.OPEN_CART_PAGE:
            UpdateState.cartPage = true;

            return UpdateState;
        
        case actionTypes.CLOSE_CART_PAGE:
            UpdateState.cartPage = false;

            return UpdateState;

        case actionTypes.START_LOADING:
            if (action.character_type) {
                UpdateState.loading[action.comp][action.character_type] = true;
            }
            else {
                UpdateState.loading[action.comp] = true;
            }

            return UpdateState;

        case actionTypes.STOP_LOADING:
            if (action.character_type) {
                UpdateState.loading[action.comp][action.character_type] = false;
            }
            else {
                UpdateState.loading[action.comp] = false;
            }

            return UpdateState;
            
        case actionTypes.OPEN_ERROR_MESSAGE:
            if (action.character_type) {
                UpdateState.errorForm[action.comp][action.character_type]["error"] = true;
                UpdateState.errorForm[action.comp][action.character_type].content = action.error_msg;
            }
            else {
                UpdateState.errorForm[action.comp]["error"] = true;
                UpdateState.errorForm[action.comp].content = action.error_msg;
            }

            return UpdateState;

        case actionTypes.CLOSE_ERROR_MESSAGE:
            if (action.character_type) {
                UpdateState.errorForm[action.comp][action.character_type]["error"] = false;
                UpdateState.errorForm[action.comp][action.character_type].content = null;
            }
            else {
                UpdateState.errorForm[action.comp]["error"] = false;
                UpdateState.errorForm[action.comp].content = null;
            }

            return UpdateState;

            case actionTypes.OPEN_MESSAGE:
                UpdateState.message.open = true;
                UpdateState.message.content = action.message;

            return UpdateState;

            case actionTypes.CLOSE_MESSAGE:
                UpdateState.message.open = false;
                UpdateState.message.content = null;

            return UpdateState;

        default:
            return state;
    }
}

export default form;