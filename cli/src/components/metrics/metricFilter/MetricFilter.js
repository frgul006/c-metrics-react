import React from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import * as metricActions from "../../../actions/metricActions";
import PropTypes from "prop-types";
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import "./MetricFilter.css";
import {metricTypes} from "../../../constants/constants";
// Stateless Functional Component
const MetricFilter = ({ filter, onStartDateChanged, onEndDateChanged, onPrimaryMetricChanged, onSecondaryMetricChanged }) => {

    // In a real app I would get this information from the API
    const minDate = new Date("2014-02-01");
    const maxDate = new Date("2015-09-30");

    const availableMetrics = [metricTypes.NONE, metricTypes.REVENUE, metricTypes.ROI, metricTypes.CLICKS, metricTypes.COST];
    const availablePrimaryMetrics = availableMetrics.filter(metric => metric !== metricTypes.NONE && metric !== filter.secondaryMetric);
    const availableSecondaryMetrics = availableMetrics.filter(metric => metric !== filter.primaryMetric);

    return (
        <div>
            <div className="c-metric__filters">
                <div className="c-metric__filter">
                    <DatePicker
                        className="c-datepicker"
                        floatingLabelText="Start Date"
                        hintText="Start Date"
                        value={filter.startDate}
                        minDate={minDate}
                        maxDate={filter.endDate}
                        onChange={onStartDateChanged}
                    />
                    <div className="c-metric__bracket" />
                    <DatePicker
                        className="c-datepicker"
                        floatingLabelText="End Date"
                        hintText="End Date"
                        value={filter.endDate}
                        minDate={filter.startDate}
                        maxDate={maxDate}
                        onChange={onEndDateChanged}
                    />
                </div>
                <div className="c-metric__filter">
                    <div className="c-metric__dropdown mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <DropDownMenu id="c-metric__filter-primary" onChange={onPrimaryMetricChanged} value={filter.primaryMetric} style={{ width: "100%" }}>
                            {availablePrimaryMetrics.map(metric =>
                                <MenuItem key={metric} value={metric} primaryText={metric}/>
                            )}
                        </DropDownMenu>
                        <label className="mdl-textfield__label" htmlFor="c-metric__filter-primary">Metric 1</label>
                    </div>

                    <div className="c-metric__dropdown mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <DropDownMenu id="c-metric__filter-secondary" onChange={onSecondaryMetricChanged} value={filter.secondaryMetric} style={{ width: "100%" }}>
                            {availableSecondaryMetrics.map(metric =>
                                <MenuItem key={metric} value={metric} primaryText={metric} />
                            )}
                        </DropDownMenu>
                        <label className="mdl-textfield__label" htmlFor="c-metric__filter-secondary">Metric 2</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

MetricFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    onStartDateChanged: PropTypes.func.isRequired,
    onEndDateChanged: PropTypes.func.isRequired,
    onPrimaryMetricChanged: PropTypes.func.isRequired,
    onSecondaryMetricChanged: PropTypes.func.isRequired
};

export default MetricFilter;

/*class MetricFilter extends React.Component {
                constructor(props, context) {
            super(props, context);

        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onEndDateChanged = this.onEndDateChanged.bind(this);
    }



     render() {
        const {startDate, endDate } = this.props;

         return (
            <div className="c-metric__filter">
                <DatePicker
                    floatingLabelText="Start Date"
                    hintText="Start Date"
                    value={startDate}
                    onChange={this.onStartDateChanged}
                />
                <DatePicker
                    floatingLabelText="End Date"
                    hintText="End Date"
                    value={endDate}
                    onChange={this.onEndDateChanged}
                />
            </div>
            );
     }
}

MetricFilter.propTypes = {
                startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

// state = Redux State
// ownProps = Component Props
function mapStateToProps(state, ownProps) {
    return state.metrics.filter;
}

function mapDispatchToProps(dispatch) {
    return {
                actions: bindActionCreators(metricFilterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricFilter);*/