'use strict';


class Solver {

  constructor(puzzle) {
    this.puzzle = puzzle;
    this.limit = 1000000;

    this.numbers = () =>
      new Array(9)
        .join(" ")
        .split(" ")
        .map((num , i) => i + 1);

    this.result = new Array(9 * 9)
      .join(" ")
      .split(" ")
      .map(entry => null);

    this.stack = [];

    this.success = this._solve(this.puzzle, 0);
  }

  solution() {
    return this._toRows(this.result);
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

  validate(map, number, index) {
    const rowIndex = Math.floor(index / 9);
    const colIndex = index % 9;

    const row = map.slice(
      rowIndex * 9, 9 * (rowIndex + 1)
    );

    const col = map.filter((e, i) =>
      i % 9 === colIndex
    );

    const boxRow = Math.floor(rowIndex / 3);
    const boxCol = Math.floor(colIndex / 3);

    const box = map.filter((e, i) =>
      Math.floor(Math.floor(i / 9) / 3) === boxRow &&
      Math.floor((i % 9) / 3) === boxCol
    );

    return {
      row: {
        first: row.indexOf(number),
        last: row.lastIndexOf(number)
      },
      col: {
        first: col.indexOf(number),
        last: col.lastIndexOf(number)
      },
      box: {
        first: box.indexOf(number),
        last: box.lastIndexOf(number)
      }
    }
  }

  _validate(map, index) {
    if (!map[index].length) {
      return false;
    }

    this.stack.splice(index, this.stack.length);

    const path = map[index];
    const number = path[path.length - 1];

    const didFoundNumber = this.validate(this.stack, number, index);

    return (
      didFoundNumber.col.first === -1 &&
      didFoundNumber.row.first === -1 &&
      didFoundNumber.box.first === -1
    )
  }

  _solve(puzzle, index) {
    if (index === 9 * 9) {
      return true;
    }

    if (--this.limit < 0) {
      return false;
    }

    let path = puzzle[index] || [];


    if (!path.length) {
      puzzle[index] = path = this.numbers();
      if (index > 0) {
        puzzle[index - 1].pop();
        return false;
      }
    }

    const currentNumber = path[path.length - 1];

    const isValid = this._validate(puzzle, index);
    if (!isValid) {
      puzzle[index].pop();
      puzzle[index + 1] = this.numbers();
      return false;
    } else {
      this.stack.push(currentNumber);
    }

    for (let x of path.entries()) {
      if (this._solve(puzzle, index + 1)) {
        this.result[index] = currentNumber;
        return true;
      }
    }

    return false;
  }
}

module.exports = Solver;