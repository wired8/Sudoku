import React, { Component } from "react";
import Grid from "./grid";
import SudukoBoard from "./board";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NewGame, Solve } from '../api/methods/game';

class SudokuGame extends Component {
  constructor(props) {
    super(props);
    this.state = { puzzle: this.props.board.currentBoard };
  }

  componentWillMount() {
    this.props.NewGame();
  }

  solve() {
    console.log('SOLVE!',this.props.board.currentBoard);
    this.props.Solve(this.props.board.currentBoard);
  }

  onCellValueEdited(row, col, value) {
    const grid = new Grid(this.state.puzzle);

    grid.rows[row][col].value = value;
    // update the state with the new puzzle string
    this.setState({ puzzle: grid.toFlatString() });
  }

  clearAll() {
    this.setState({ puzzle: new Grid().toFlatString() });
  }

  render() {
    return (
      <div className="game">
        <h1>Sudoku Solver</h1>
        <SudukoBoard
          puzzle={this.state.puzzle}
          onCellValueChange={this.onCellValueEdited.bind(this)}
        />
        <div className="buttons">
          <button onClick={() => this.solve()}>Solve It!</button>
          <button onClick={() => this.clearAll()}>Clear All</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  //return bindActionCreators({NewGame: NewGame, Solve: Solve}, dispatch)
  return {
    NewGame: (args) => dispatch(NewGame()),
    Solve: (args) => dispatch(Solve(args)),
  };
}

function mapStateToProps(state){
  return { board: state.board }
}
export default connect(mapStateToProps, mapDispatchToProps)(SudokuGame)