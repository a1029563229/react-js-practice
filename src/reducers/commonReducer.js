import { UPLOAD_FILE } from "../actions/types";

const initialState = {
    file: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        default: return { ...state };
        case UPLOAD_FILE:
            return {
                ...state,
                file: action.payload
            }
    }
}