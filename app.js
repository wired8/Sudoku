'use strict';

const express = require('express'),
  router = express.Router(),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const routes = require('./routes/index.js');
app.use('/api/v1', routes(router));
app.use('/api', routes(router));

// 404
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route '+req.url+' not found.' });
});

// 500 - Any server error
app.use(function(err, req, res, next) {
  return res.status(500).send({ error: err.message });
});

app.listen(port);

module.exports = app;






