'use strict';
const Suduko = require('../lib/sudoku');
const Solver = require('../lib/solver');
const suduko = new Suduko(27);

const puzzle = suduko.getBoard();
//console.log(puzzle);

console.log(new Solver(puzzle).solution());
