'use strict';

const Sudoku = require('../lib/sudoku'),
      Solver = require('../lib/solver');

exports.newGame = function(level, callback) {
  level = level || 27;
  const sudoku = new Sudoku(level);
  const puzzle = sudoku.getBoard();
  console.log(puzzle);
  const merged = [].concat.apply([], puzzle);

  const board = {
    board: merged
  };
  return callback(null, board);
};


exports.solve = function(puzzle, callback) {
  const solver = new Solver(50000);
  console.log('puzzle in', puzzle);
  solver.solve(puzzle);
  console.log('puzzle out', puzzle);
  const merged = [].concat.apply([], puzzle);
  const solution = {
    board: merged
  };
  return callback(null, solution);
};


