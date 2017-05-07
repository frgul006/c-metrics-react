import * as types from "./actionTypes";
import metricApi from "../api/metricApi";
import moment from "moment";
import { makeActionCreator } from "../helpers/actionHelper";

// Metric Action Creators
export const loadMetricsFailed = makeActionCreator(types.LOAD_METRICS_FAILED, "error");

export const loadMetricsSuccess = makeActionCreator(types.LOAD_METRICS_SUCCESS, "metrics");

export const loadMetricsRequested = (startDate, endDate) => {
    return (dispatch) => {
        const startDateStr = getStringFromDate(startDate);
        const endDateStr = getStringFromDate(endDate);

        dispatch({
            type: types.LOAD_METRICS_REQUESTED
        });

        return metricApi.getStats(startDateStr, endDateStr).then(metrics => {

            const group = (arr, key) => {
                let map = {};
                arr.map(e => ({ k: key(e), d: e })).forEach(e => {
                    map[e.k] = map[e.k] || [];
                    map[e.k].push(e.d);
                });
                return Object.keys(map).map(k => ({ key: k, data: map[k] }));
            };

            const sum = (tick, property) => {
                return tick.data.map(property).reduce((prev, curr) => { return prev + curr; });
            };

            const dailyTicks = (metric) => metric.date;
            const monthlyTicks = (metric) => metric.date.substring(0, metric.date.length -3);

            // TODO Find a more efficient way to calculate tick count without mapping the entire array
            let ticks = group(metrics, dailyTicks);
            const isTooMany = ticks.length >= 93;
            if(isTooMany)
                ticks = group(metrics, monthlyTicks);

            let summarizedMetrics = ticks.map(tick => {
                return {
                    date: tick.key,
                    clicks: sum(tick, data => data.clicks),
                    cost: sum(tick, data => data.cost),
                    revenue: sum(tick, data => data.revenue),
                    impressions: sum(tick, data => data.impressions),
                    conversions: sum(tick, data => data.conversions),
                };
            });
            dispatch(loadMetricsSuccess(summarizedMetrics));
        }).catch(e => {
            dispatch(loadMetricsFailed(e));
        });
    };
};

const getStringFromDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

// Metric Filter Action Creators
export const startDateChanged = makeActionCreator(types.METRIC_FILTER_STARTDATE_CHANGED, "startDate");
export const endDateChanged = makeActionCreator(types.METRIC_FILTER_ENDDATE_CHANGED, "endDate");
export const primaryMetricChanged = makeActionCreator(types.METRIC_FILTER_PRIMARY_METRIC_CHANGED, "primaryMetric");
export const secondaryMetricChanged = makeActionCreator(types.METRIC_FILTER_SECONDARY_METRIC_CHANGED, "secondaryMetric");