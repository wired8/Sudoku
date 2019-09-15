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

  router.route('/game/solve')
    .post(function (req, res, next) {
      const e = req.body.puzzle;
      const puzzle =  chunk(e.replace(/, +/g, ",").split(",").map(Number),9);
      gameController.solve(puzzle, function (err, result) {
        return res.json(result);
      });
    });
};

function chunk(arr, chunkSize) {
  let R = [];
  for (let i = 0; i < arr.length; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}
