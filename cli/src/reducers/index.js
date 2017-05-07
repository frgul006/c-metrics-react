import {combineReducers} from "redux";
import metrics from "./metricReducer";

const rootReducer = combineReducers({
    metrics // ES6 short hand property name 
});

export default rootReducer;