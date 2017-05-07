/* eslint react/forbid-prop-types: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleChartLoader from '../../../helpers/googleChartLoader';
import { metricTypes } from "../../../constants/constants";

class MetricChart extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (typeof window === 'undefined') {
            return;
        }
        if (!GoogleChartLoader.isLoaded) {
            GoogleChartLoader.init(["corechart"], "current").then(() => {
                this.generateChart();
            });
        } else {
            this.generateChart();
        }
    }

    componentDidUpdate(prevState, prevProps) {

        if (GoogleChartLoader.isLoading) {
            GoogleChartLoader.initPromise.then(() => {
                this.generateChart();
            });
        } else if (GoogleChartLoader.isLoaded) {
            this.generateChart();
        }
    }

    generateColumns() {
        let data = new google.visualization.DataTable();
        data.addColumn('date', 'Day');
        data.addColumn('number', this.props.primaryMetric);

        if (this.props.secondaryMetric !== metricTypes.NONE)
            data.addColumn('number', this.props.secondaryMetric);

        return data;
    }

    getRowValueForMetric(metric, metricType) {
        switch (metricType) {
            case metricTypes.CLICKS:
                return metric.clicks;
            case metricTypes.COST:
                return metric.cost;
            case metricTypes.REVENUE:
                return metric.revenue;
            case metricTypes.ROI:
                return metric.revenue / metric.cost;
        }
    }

    getAxis(metricType, gridlineColor = "#CCC") {

        let defaultAxis = {
            title: metricType,
            titleTextStyle: { italic: false },
            viewWindow: { min: 0 },
            gridlines: {

                count: -1,
                color: gridlineColor
            }
        };

        switch (metricType) {
            case metricTypes.CLICKS:
            case metricTypes.ROI:
                return defaultAxis;
            case metricTypes.COST:
            case metricTypes.REVENUE: {
                defaultAxis.format = "currency";
                return defaultAxis;
            }
        }
    }

    generateRow(metric, hasSecondaryMetric) {
        let row = [];

        row.push(new Date(metric.date));
        row.push(this.getRowValueForMetric(metric, this.props.primaryMetric));

        if (hasSecondaryMetric)
            row.push(this.getRowValueForMetric(metric, this.props.secondaryMetric));

        return row;
    }

    isCurrency(metricType) {
        return metricType === metricTypes.COST || metricType === metricTypes.REVENUE;
    }

    generateChart() {
        let chartDiv = document.getElementById("c-metric__chart");
        let hasSecondaryMetric = this.props.secondaryMetric !== metricTypes.NONE;
        let data = this.generateColumns();
        let rows = this.props.metrics.map(metric => this.generateRow(metric, hasSecondaryMetric));

        data.addRows(rows);

        let title = this.props.secondaryMetric !== metricTypes.NONE ?
            this.props.primaryMetric + " vs " + this.props.secondaryMetric : this.props.primaryMetric;

        let series = {
            0: { targetAxisIndex: 0 }
        };

        let vAxes = {
            0: this.getAxis(this.props.primaryMetric)
        };

        if (hasSecondaryMetric) {

            let shouldUseSameAxis =
                this.isCurrency(this.props.primaryMetric) &&
                this.isCurrency(this.props.secondaryMetric);

            if (shouldUseSameAxis) {
                series[1] = { targetAxisIndex: 0 };
            }
            else {
                series[1] = { targetAxisIndex: 1 };
                vAxes[1] = this.getAxis(this.props.secondaryMetric, "#FFF");
            }
        }

        let options = {
            axisTitlePosition: "in",
            width: "100%",
            chartArea: {
                // left: "0",
                // width: "100%"
            },
            crosshair: {
                opacity: 0.5,
                trigger: "both"
            },
            title: title,
            animation: {
                duration: 500,
                easing: 'out',
                startup: true
            },
            series: series,
            vAxes: vAxes,
            hAxis: {
                gridlines: {
                    color: "#fff",
                    count: -1
                },
            },
            legend: {
                position: "top",
                alignment: "end"
            },
            pointSize: 6,
            pointsVisible: rows.length <= 32
        };

        function drawChart() {
            let chart = new google.visualization.LineChart(chartDiv);
            chart.draw(data, options);
        }

        drawChart();
    }

    render() {
        return (
            <div id="c-metric__chart" style={{ width: "100%", height: "400px" }}>
                <div className="c-metric__chart-placeholder" />
            </div>
        );
    }
}

MetricChart.propTypes = {
    metrics: PropTypes.array.isRequired,
    primaryMetric: PropTypes.string.isRequired,
    secondaryMetric: PropTypes.string.isRequired,
    isFetching: PropTypes.bool
};

export default MetricChart;