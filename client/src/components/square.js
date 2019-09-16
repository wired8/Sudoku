import React, { Component } from "react";
import "../assets/style/index.css";

export default class Square extends Component {
  fireOnChange(evt) {
    let value = evt.target.value;
    console.log('value:',value);
    if (this.isInt(value) || value === "") {
      this.props.onCellValueChange(
        this.props.row,
        this.props.col,
        evt.target.value
      );
    }
  }

  isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
  }

  render() {
    const value = this.props.value;
    return (
      <input
        type="tel"
        value={!this.isInt(value) || value === 0 ? "" : value}
        maxLength="1"
        onChange={this.fireOnChange.bind(this)}
        className={this.getCellStyling(this.props.row, this.props.col)}
        id={this.props.id}
      />
    );
  }

  getCellStyling(row, col) {
    const board = this.props.currentBoard;
    const index = (row * 9) + col;
    if (this.props.currentBoard && this.props.currentBoard[index] && this.props.isSolved) {
      return 'solved-cell';
    }
    if (this.props.errorCells && this.props.errorCells[index]) {
      return 'invalid-cell';
    }
    if (board && board[index] === 0) {
      return null;
    }
    return 'valid-cell';
  }
}





