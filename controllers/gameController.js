'use strict';

const Sudoku = require('../lib/sudoku'),
      Solver = require('../lib/solver'),
      Validator = require('../lib/validator');

exports.newGame = function(level, callback) {
  level = level || 27;
  const sudoku = new Sudoku(level);
  const puzzle = sudoku.getBoard();
  const merged = [].concat.apply([], puzzle);
  const board = {
    board: merged
  };
  return callback(null, board);
};

exports.validate = function(board, callback) {
  const errors = Validator.findErrors(board);
  const merged = [].concat.apply([], errors);
  const result = {
    errors: merged
  };
  return callback(null, result);
};


exports.solve = function(puzzle, callback) {
  const solver = new Solver(50000);
  const result = solver.solve(puzzle);
  const merged = [].concat.apply([], puzzle);
  const solution = {
    board: merged,
    solved: result
  };
  return callback(null, solution);
};


