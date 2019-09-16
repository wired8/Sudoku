'use strict';

const chai = require('chai');
const Suduko = require('../lib/sudoku');
const Solver = require('../lib/solver');
const solver = new Solver(50000000);
const suduko = new Suduko(27);

const puzzle = suduko.getBoard();

const unsolvableBoard = {
  puzzle: '6,0,0,0,0,8,9,4,0,' +
          '9,0,0,0,0,6,1,0,0,' +
          '0,7,0,0,4,0,0,0,0,' +
          '2,0,0,6,1,0,0,0,0,' +
          '0,0,0,0,0,0,2,0,0,' +
          '0,8,9,0,0,2,0,0,0,' +
          '0,0,0,0,6,0,0,0,5,' +
          '0,0,0,0,0,0,0,3,0,' +
          '8,0,0,0,0,1,6,0,0'
};


describe('Sudoku Solver Algorithm', () => {

  it('should solve level 22', (done) => {
    const puzzle = chunk(unsolvableBoard.puzzle.replace(/, +/g, ",").split(",").map(Number),9);
    console.log(solver.solve(puzzle));
    console.log(puzzle);
    return done();
  }).timeout(500000);

});

function chunk(arr, chunkSize) {
  let R = [];
  for (let i = 0; i < arr.length; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}

