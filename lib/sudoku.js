'use strict';

const validator = require('./validator');
const Solver = require('./solver');

/*
  The Rules
  -------------------------------------------------------------------
  1. The board is comprised of a 9×9 matrix, divided into 9 sub sections
  2. Each square can have a number from 1 to 9
  3. Numbers must be unique per row
  4. Numbers must be unique per column
  5. Numbers must be unique per section
 */
class Sudoku {

  constructor(clues) {
    this.clues = clues;
    this.board = this._generateBoard();
    const solver = new Solver(50000);
    while (true) {
      let result = solver.solve(this.board);
      if (result) {
        break;
      }
      this.board = this._generateBoard();
    }
  };

  _getRandomIntBetween(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  _generateBoard() {
    let board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    for (let i = 0; i < 9; i++) {
      board[i][i] = this._getRandomIntBetween(1, 9);
      while (!validator.validateCell(i, i, board)) {
        board[i][i] = this._getRandomIntBetween(1, 9);
      }
      if (i !== 4) {
        board[i][8 - i] = this._getRandomIntBetween(1, 9);
        while (!validator.validateCell(i, 8 - i, board)) {
          board[i][8 - i] = this._getRandomIntBetween(1, 9);
        }
      }
    }
    return board;
  }

  _findPopulatedCell(board) {
    let row, col;
    do {
      row = this._getRandomIntBetween(0, 8);
      col = this._getRandomIntBetween(0, 8);
    } while (board[row][col] === 0);
    return [row, col];
  }

  getBoard() {
    let row, col;
    const numberOfCellsToClear = 81 - this.clues;
    for (let i = 0; i < numberOfCellsToClear; i++) {
      [row, col] = this._findPopulatedCell(this.board);
      this.board[row][col] = 0;
    }
    return this.board;
  }
}

module.exports = Sudoku;