import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, reduxImmutableStateInvariant())
);

export default function configureStore(initialState) {
    return createStore(
        rootReducer, 
        initialState,
        enhancer
    );
}