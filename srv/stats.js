var fs       = require('fs');
var _        = require('lodash');
var moment   = require('moment');
var urlParse = require('url-parse');

module.exports = function (req, res, next) {
  var url = urlParse(req.url, true);
  if (url.pathname === '/stats') {
    getStats(getDateFromString(url.query.startDate),
      getDateFromString(url.query.endDate))
      .then(function (output) {
        res.end(output);
      });
  } else {
    next();
  }
}

function getDateFromString(dateStr) {
  return moment(dateStr, 'YYYY-MM-DD');
}

function getStats (startDate, endDate) {
  var dates = dateSequence(startDate, endDate);
  var statsPromises = _.map(dates, function (date) {
    return getDecoratedStats(date);
  });
  return Promise.all(statsPromises)
    .then(function (allDecoratedStats) {
      return JSON.stringify(_.flatten(allDecoratedStats));
    });
}

function dateSequence(startDate, endDate) {
  var length = endDate.diff(startDate, 'days');
  var seq = sequence(0, length);
  return _.map(seq, function (daysDiff) {
    return startDate.clone().add(daysDiff, 'days');
  });
}

function getDecoratedStats(date) {
  return new Promise(function (resolve, reject) {
    readStatsFile(date)
      .then(function (json) {
        resolve(decorateStats(json));
      });
  });
}

function readStatsFile (date) {
  return new Promise(function (resolve, reject) {
    var filename = './data/stats_' + date.format('YYYY-MM-DD') + '.json';
    fs.readFile(filename , 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function decorateStats (json) {
  var rows = JSON.parse(json);
  return _.map(rows, function (row) {
    return _.zipObject(statsColumns, row);
  });
}

var statsColumns = ['date', 'device', 'match-type', 'clicks',
  'revenue', 'conversions', 'cost', 'impressions'];

function sequence(start, stop) {
  var seq = [];
  for (var i = start; i <= stop; i++) {
    seq.push(i);
  }
  return seq;
}