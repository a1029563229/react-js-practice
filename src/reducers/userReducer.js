import { LOGIN_BY_EMAIL, UPDATE_USER_INFO, PULL_USER_INFO } from "../actions/types";

const initialState = {
    user_info: null,
    token: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        default: return { ...state };
        case LOGIN_BY_EMAIL:
            return {
                ...state,
                token: action.payload
            }

        case UPDATE_USER_INFO:
            return {
                ...state,
                user_info: action.payload
            }

        case PULL_USER_INFO:
            return {
                ...state
            }
    }
}