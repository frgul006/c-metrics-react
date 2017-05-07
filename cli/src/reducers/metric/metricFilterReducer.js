import * as types from "../../actions/actionTypes";
import { updateObject } from "../../helpers/reducerHelper";

const startDateChanged = (state, action) => {
    return updateObject(state, { startDate: action.startDate, endDate: state.endDate });
};

const endDateChanged = (state, action) => {
    return updateObject(state, { startDate: state.startDate, endDate: action.endDate });
};

const primaryMetricChanged = (state, action) => {
    return updateObject(state, { primaryMetric: action.primaryMetric});
};

const secondaryMetricChanged = (state, action) => {
    return updateObject(state, { secondaryMetric: action.secondaryMetric});
};

export default (state, action) => {
    switch (action.type) {
        case types.METRIC_FILTER_STARTDATE_CHANGED: return startDateChanged(state,action); 
        case types.METRIC_FILTER_ENDDATE_CHANGED: return endDateChanged(state, action);
        case types.METRIC_FILTER_PRIMARY_METRIC_CHANGED: return primaryMetricChanged(state, action);
        case types.METRIC_FILTER_SECONDARY_METRIC_CHANGED: return secondaryMetricChanged(state, action);
        default: return state;
    }
};