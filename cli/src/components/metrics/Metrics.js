import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as metricActions from "../../actions/metricActions";
import PropTypes from "prop-types";
import MetricFilter from "./metricFilter/MetricFilter";
import MetricChart from "./metricChart/MetricChart";
import MetricList from "./metricList/MetricList";

// Container Component
class Metrics extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onEndDateChanged = this.onEndDateChanged.bind(this);
        this.onPrimaryMetricChanged = this.onPrimaryMetricChanged.bind(this);
        this.onSecondaryMetricChanged = this.onSecondaryMetricChanged.bind(this);

        this.props.actions.loadMetricsRequested(props.filter.startDate, props.filter.endDate);
    }

    componentWillReceiveProps(nextProps) {
        const newStartDate = nextProps.filter.startDate;
        const newEndDate = nextProps.filter.endDate;
        this.checkFilters(newStartDate, newEndDate);

        // const newPrimary = nextProps.filter.primaryMetric;
        // const newSecondary = nextProps.filter.secondaryMetric;
        // this.checkPrimaryAndSecondary(newPrimary, newSecondary);
    }

    checkFilters(newStartDate, newEndDate) {
        const hasChanged = this.props.filter.startDate !== newStartDate || this.props.filter.endDate !== newEndDate;

        if (hasChanged) {
            this.props.actions.loadMetricsRequested(newStartDate, newEndDate);
        }
    }

    // checkPrimaryAndSecondary(newPrimary, newSecondary) {
    //     const hasChanged = this.props.filter.primaryMetric !== newPrimary || this.props.filter.secondaryMetric !== newSecondary;

    //     if (hasChanged) {
    //         this.props.actions.loadMetricsRequested(newStartDate, newEndDate);
    //     }
    // }

    onStartDateChanged(event, date) {
        this.props.actions.startDateChanged(date);
    }

    onEndDateChanged(event, date) {
        this.props.actions.endDateChanged(date);
    }

    onPrimaryMetricChanged(event, index, metric) {
        this.props.actions.primaryMetricChanged(metric);
    }

    onSecondaryMetricChanged(event, index, metric) {
        this.props.actions.secondaryMetricChanged(metric);
    }

    render() {
        const { metrics, isFetching, filter } = this.props;

        return (
            <div>
                <MetricFilter 
                    filter={filter} 
                    onStartDateChanged={this.onStartDateChanged} 
                    onEndDateChanged={this.onEndDateChanged} 
                    onPrimaryMetricChanged={this.onPrimaryMetricChanged} 
                    onSecondaryMetricChanged={this.onSecondaryMetricChanged} />
                <MetricChart 
                    metrics={metrics} 
                    primaryMetric={filter.primaryMetric}
                    secondaryMetric={filter.secondaryMetric}
                    isFetching={isFetching} />
                <MetricList 
                    metrics={metrics} 
                    isFetching={isFetching} />
            </div>
        );
    }
}

Metrics.propTypes = {
    isFetching: PropTypes.bool,
    metrics: PropTypes.array.isRequired,  
    filter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.metrics;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(metricActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);