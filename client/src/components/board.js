import React, { Component } from "react";
import Grid from "./grid";
import Square from "./square";
import { connect } from 'react-redux';

class SudukoBoard extends Component {
  render() {
    const grid = new Grid(this.props.board.currentBoard);

    return (
      <table className="sudoku">
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
                    onCellValueChange={this.props.onCellValueChange}
                  />
                </td>
              ))}
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state){
  return { board: state.board }
}

export default connect(mapStateToProps)(SudukoBoard)