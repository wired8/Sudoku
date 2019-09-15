'use strict';

class Validator {

  static validateBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== 0 && !this.validateCell(row, col, board)) {
          return false;
        }
      }
    }
    return true;
  };

  static validateCell(row, col, board) {
    return (
      this.validateCellValue(row, col, board) &&
      this.validateCellInRow(row, col, board) &&
      this.validateCellInColumn(row, col, board) &&
      this.validateCellInSector(row, col, board)
    );
  };

  static isEmpty(errorCells) {
    return !errorCells.filter(row => row.filter(cell => cell).length >= 1).length >= 1;
  };

  static validateCellValue(row, col, board) {
    return board[row][col] >= 1 && board[row][col] <= 9 && Number.isInteger(board[row][col]);
  };

  static validateCellInRow(row, col, board) {
    return board[row].filter(element => element === board[row][col]).length <= 1;
  };

  static validateCellInColumn(row, col, board) {
    return this.validateCellInRow(col, row, this.transpose(board));
  };

  static validateCellInSector(row, col, board) {
    let rowBase = Math.floor(row / 3) * 3;
    let colBase = Math.floor(col / 3) * 3;

    for (let r = rowBase; r < rowBase + 3; r++) {
      for (let c = colBase; c < colBase + 3; c++) {
        if (r !== row && c !== col && board[r][c] === board[row][col]) {
          return false;
        }
      }
    }
    return true;
  };

  static transpose(matrix) {
    return matrix[0].map(function (col, index) {
      return matrix.map(function (row) {
        return row[index];
      });
    });
  };
}

module.exports = Validator;
