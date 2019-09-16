'use strict';

const validator = require('./validator');

class Solver {

  constructor(limit) {
    this.nodeProcessLimit = limit;
    this.nodesProcessed = 0;
  }

  solve(board) {
    if (validator.validateBoard(board)) {
      try {
        this.nodesProcessed = 0;
        if (this._solveHelper(0, 0, board)) {
          return validator.validateBoard(board);
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  _solveHelper(row, col, board) {
    ++this.nodesProcessed;
    if (this.nodesProcessed >= this.nodeProcessLimit) {
      throw new Error(`Solution not found after processing ${nodesProcessed} nodes`);
    }
    if (col >= 9) {
      col = 0;
      row++;
    }
    if (row >= 9) {
      return true;
    }
    if (board[row][col] === 0) {
      for (let i = 1; i <= 9; ++i) {
        board[row][col] = i;
        if (validator.validateCell(row, col, board)) {
          if (this._solveHelper(row, col + 1, board)) {
            return true;
          }
        }
      }
      board[row][col] = 0;
      return false;
    }
    return this._solveHelper(row, col + 1, board);
  }

  _hasUniqueSolution(board) {
    if (validator.validateBoard(board)) {
      try {
        if (this._hasUniqueSolutionHelper(0, 0, board, 0)) {
          return validator.validateBoard(board);
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }

   _hasUniqueSolutionHelper(row, col, board, validSolutionCount) {
    if (col >= 9) {
      col = 0;
      ++row;
    }
    if (row >= 9) {
      return true;
    }
    console.log(board);
    if (board[row][col] === 0) {
      for (let i = 1; i <= 9; i++) {
        board[row][col] = i;
        if (validator.validateCell(row, col, board)) {
          if (this._hasUniqueSolutionHelper(row, col + 1, board, validSolutionCount)) {
            validSolutionCount++;
            if (validSolutionCount > 1) {
              throw new Error('More than one valid solution found');
            }
          }
        }
      }
      board[row][col] = 0;
      return validSolutionCount === 1;
    }
    return this._hasUniqueSolutionHelper(row, col + 1, board, validSolutionCount);
  }

}

module.exports = Solver;