import React, { Component } from "react";
import Grid from "./grid";
import Square from "./square";
import { connect } from 'react-redux';

class SudukoBoard extends Component {
  render() {
    const grid = new Grid(this.props.board.currentBoard);
    let cellCount = 0;
    return (
      <div className={'sudoku-board'}>
        <table id="grid">
          <tbody>
          {grid.rows.map((row, idx) => {
            return (
              <tr key={idx}>
                {row.map(cell => (
                  <td key={cell.col}>
                    <Square
                      value={cell.value}
                      row={cell.row}
                      col={cell.col}
                      id={`cell-${cellCount++}`}
                      currentBoard={this.props.board.currentBoard}
                      errorCells={this.props.board.errorCells}
                      isSolved={this.props.board.solved}
                      onCellValueChange={this.props.onCellValueChange}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { board: state.board }
}

export default connect(mapStateToProps)(SudukoBoard)