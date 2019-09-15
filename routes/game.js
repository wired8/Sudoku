'use strict';

module.exports = function (router) {
  const gameController = require('../controllers/gameController');

  router.route('/game/:level?')
    .get(function (req, res, next) {
      const level = req.params.level || 27;
      gameController.newGame(level, function (err, result) {
        return res.json(result);
      });
    });

  router.route('/game/solution')
    .post(function (req, res, next) {
      const puzzle = req.body.puzzle;
      gameController.solve(puzzle, function (err, result) {
        return res.json(result);
      });
    });
};


