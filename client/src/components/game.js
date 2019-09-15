import React, { Component } from "react";
import SudukoBoard from "./board";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NewGame, Solve, Validate} from '../api/methods/game';
import {enterValue, validate} from '../actions/gameActions';

class SudokuGame extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.NewGame();
  }

  solve() {
    this.props.Solve(this.props.board.currentBoard);
  }

  onCellValueEdited(row, col, value) {
    const i = row * 9;
    const index = i+col;
    this.props.dispatch(enterValue(index, parseInt(value, 10)));
    this.props.Validate(this.props.board.currentBoard);
  }

  newGame() {
    this.props.NewGame();
  }

  render() {
    return (
      <div className="game">
        <h1>Sudoku Solver</h1>
        <SudukoBoard
          onCellValueChange={this.onCellValueEdited.bind(this)}
        />
        <div className="buttons">
          <button onClick={() => this.solve()}>Solve It!</button>
          <button onClick={() => this.newGame()}>New Game</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    NewGame: (args) => dispatch(NewGame()),
    Solve: (args) => dispatch(Solve(args)),
    Validate: (args) => dispatch(Validate(args)),
    dispatch
  };
}

function mapStateToProps(state){
  return { board: state.board }
}
export default connect(mapStateToProps, mapDispatchToProps)(SudokuGame)