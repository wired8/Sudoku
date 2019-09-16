'use strict';
const Suduko = require('../lib/sudoku');
const Solver = require('../lib/solver');
const solver = new Solver(50000);
const suduko = new Suduko(27);

const puzzle = suduko.getBoard();

console.log('Puzzle', puzzle);
solver.solve(puzzle);
console.log('Soln:', puzzle);
