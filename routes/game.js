'use strict';

module.exports = function (router) {
  const gameController = require('../controllers/gameController');

  router.route('/game/:level?')
    .get(function (req, res, next) {
      const level = req.params.level || 27;
      gameController.newGame(level, function (err, result) {
        console.log(result);
        return res.json(result);
      });
    });

  router.route('/game/solve')
    .post(function (req, res, next) {
      const e = req.body.puzzle;
      const puzzle = _toRows(e);
      console.log(puzzle);
      gameController.solve(puzzle, function (err, result) {
        return res.json(result);
      });
    });
};


function _toRows(arr) {
  arr = chunk(arr, 9);
  let row = 0;
  const asRows = new Array(9)
    .join(" ")
    .split(" ")
    .map(row => []);

  for (let [index, entry] of arr.entries()) {
    asRows[row].push(entry);
    if ( !((index + 1) % 9) ) {
      row += 1
    }
  }
  return asRows
}

function chunk(arr, chunkSize) {
  let R = [];
  for (let i = 0; i < arr.length; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}
