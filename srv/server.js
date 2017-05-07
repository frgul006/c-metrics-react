var express = require('express')
var path = require('path')
var cors = require('./cors')
var stats = require('./stats')

var app = new express()

app.set('port', (process.env.PORT || 3001));

app.use(cors)

app.use(stats)

app.listen(app.get('port'), function (error) {
  if (error) {
    console.error(error)
  } else {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  }
})
