'use strict';

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

    this.numbers = () =>
      new Array(9)
        .join(" ")
        .split(" ")
        .map((num , i) => i + 1);

    this.board = new Array(9 * 9)
            .join(" ")
            .split(" ")
            .map(path => this._generateRandomRow());


  };

  getBoard() {
    return this._subtractCells();
  }

  _toRows(arr) {
    let row = 0;
    const asRows = new Array(9)
      .join(" ")
      .split(" ")
      .map(row => []);

    for (let [index, entry] of arr.entries()) {
      asRows[row].push(entry);
      if ( !((index + 1) % 9) ) {
        row += 1
      }
    }

    return asRows
  }

  /*
    Randomly remove cells leaving `X` number of clues
   */
  _subtractCells() {
    const _getNonEmptyIndex = () => {
      const index = Math.floor(Math.random() * _result.length);
      return _result[index] ? index : _getNonEmptyIndex()
    };

    const _result = this.board.filter(() => true);

    while (_result.length - this.clues > _result.filter(n => !n).length) {
      _result[_getNonEmptyIndex()] = '';
    }

    return _result;
  }

  /*
    Generate a random row of numbers
   */
  _generateRandomRow() {
    let row = [];
    const numbers = this.numbers();
    while (row.length < 9) {
      const i = Math.floor(Math.random() * numbers.length);
      row.push(numbers[i]);
    }
    return row;
  }
}

module.exports = Sudoku;