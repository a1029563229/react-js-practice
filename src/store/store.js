import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {};
const middleWare = [thunk];
const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : null; // 这个null值的位置原来是compose，因为报错所以先用null代替了

const enhancer = composeEnhancers(
    applyMiddleware(...middleWare),
);
const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

export default store;