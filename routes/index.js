'use strict';

const game = require('./game');

module.exports = (router) => {
  game(router);
  return router;
};