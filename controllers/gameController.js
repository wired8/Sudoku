'use strict';

const Sudoku = require('../lib/sudoku'),
      Solver = require('../lib/solver');

exports.newGame = function(level, callback) {
  level = level || 27;
  const sudoku = new Sudoku(level);
  const board = {
    board: sudoku.getBoard()
  };
  return callback(null, board);
};


exports.solve = function(puzzle, callback) {
  const solver = new Solver(puzzle);
  const solution = {
    solution: solver.solution()()
  };
  return callback(null, solution);
};


