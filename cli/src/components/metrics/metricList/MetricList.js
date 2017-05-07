import React from "react";
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


// Stateless Functional Component
const MetricList = ({ metrics, isFetching }) => {

    const round = (value, precision = 0) => {
        const multiplier = Math.pow(10, precision);
        return Math.round(value * multiplier) / multiplier;
    };

    const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    const totalCost = metrics.reduce((prev, next) => prev + next.cost, 0);
    const totalClicks = metrics.reduce((prev, next) => prev + next.clicks, 0);
    const totalRevenue = metrics.reduce((prev, next) => prev + next.revenue, 0);
    const roi = totalRevenue / totalCost;

    if (isFetching && (!metrics || metrics.length === 0)) {
        return (
            <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate"/>
        );
    } else {
        return (
            <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>ROI</TableHeaderColumn>
                        <TableHeaderColumn>Cost</TableHeaderColumn>
                        <TableHeaderColumn>Clicks</TableHeaderColumn>
                        <TableHeaderColumn>Revenue</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>{round(roi, 2)}</TableRowColumn>
                        <TableRowColumn>{currencyFormat.format(totalCost)}</TableRowColumn>
                        <TableRowColumn>{totalClicks}</TableRowColumn>
                        <TableRowColumn>{currencyFormat.format(totalRevenue)}</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
};

MetricList.propTypes = {
    metrics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool
};

export default MetricList;