'use strict';
const Suduko = require('../lib/sudoku');
const Solver = require('../lib/solver');
const solver = new Solver(50000);
const suduko = new Suduko(27);

//const puzzle = [ [1,2,3,4,5,6,7,8,9], [2,3,4,5,6,7,8,9,1], [9,5,4,3,2,8,7,6,1], [1,2,3,4,5,6,7,8,9], '', '', '', '', '' ];
const puzzle = suduko.getBoard();

console.log('Puzzle', puzzle);
solver.solve(puzzle);
console.log('Soln:', puzzle);
