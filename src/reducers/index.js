import { combineReducers } from "redux";
import userReducer from "./userReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
    user: userReducer,
    common: commonReducer
})