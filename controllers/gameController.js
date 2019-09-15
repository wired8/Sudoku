'use strict';

const Sudoku = require('../lib/sudoku'),
      Solver = require('../lib/solver');

exports.newGame = function(level, callback) {
  level = level || 27;
  const sudoku = new Sudoku(level);
  var merged = [].concat.apply([], sudoku.getBoard());

  console.log(sudoku.getBoard());
  const board = {
    board: merged
  };
  return callback(null, board);
};


exports.solve = function(puzzle, callback) {
  const result = new Solver(puzzle).solution();
  console.log('---------------');
  console.log(result);
  console.log('-------END--------');
  const solution = {
    board: result
  };
  return callback(null, solution);
};


