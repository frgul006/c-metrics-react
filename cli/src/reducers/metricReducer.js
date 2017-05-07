import * as types from "../actions/actionTypes";
import { updateObject } from "../helpers/reducerHelper";
import filter from "./metric/metricFilterReducer";
import { metricTypes } from "../constants/constants";

const initialState = {
    isFetching: false,
    errors: [],
    metrics: [],
    filter: {
        startDate: new Date("2014-02-01"),
        endDate: new Date("2015-09-30"),
        primaryMetric: metricTypes.REVENUE,
        secondaryMetric: metricTypes.COST
    },
};

const loadMetricsRequested = (state) => {
    return updateObject(state, {
        isFetching: true
    });
};

const loadMetricsFailed = (state, action) => {
    return updateObject(state, {
        isFetching: false,
        errors: [...state.errors, action.error]
    });
};

const loadMetricsSuccess = (state, action) => {
    return updateObject(state, {
        isFetching: false,
        metrics: action.metrics
    });
};

const startDateChanged = (state, action) => {
    return updateObject(state, {
        filter: {
            startDate: action.startDate,
            endDate: state.endDate
        }
    });
};

const endDateChanged = (state, action) => {
    return updateObject(state, {
        filter: {
            startDate: state.startDate,
            endDate: action.endDate
        }
    });
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_METRICS_REQUESTED: return loadMetricsRequested(state);
        case types.LOAD_METRICS_FAILED: return loadMetricsFailed(state, action);
        case types.LOAD_METRICS_SUCCESS: return loadMetricsSuccess(state, action);

        case types.METRIC_FILTER_STARTDATE_CHANGED:
        case types.METRIC_FILTER_ENDDATE_CHANGED:
        case types.METRIC_FILTER_PRIMARY_METRIC_CHANGED:
        case types.METRIC_FILTER_SECONDARY_METRIC_CHANGED: {
            return updateObject(state, {
                filter: filter(state.filter, action)
            });
        }

        default: return state;
    }
};