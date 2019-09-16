import React, { Component } from "react";
import SudukoBoard from "./board";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NewGame, Solve, Validate} from '../api/methods/game';
import {enterValue, validate, resetSolution, resetBoard} from '../actions/gameActions';

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
    const index = (row * 9) + col;
    if (!this.isInt(value)) {
      value = 0;
    }
    this.props.dispatch(enterValue(index, parseInt(value, 10)));
    this.props.Validate(index, this.props.board.currentBoard);
  }

  newGame() {
    this.props.NewGame();
  }

  resetBoard() {
    this.props.ResetBoard();
  }

  resetSolution() {
    this.props.ResetSolution(this.props.board.originalBoard);
  }

  isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
  }

  render() {
    return (
      <div className="heading">
        <h1>Sudoku</h1>
        <SudukoBoard
          onCellValueChange={this.onCellValueEdited.bind(this)}
        />
        <div className={'buttons-container'}>
          {this.renderSolveClearButton()}
          {this.renderGenerateResetButton()}
        </div>
      </div>
    );
  }

  renderSolveClearButton() {
    return this.props.board.solved ? (
      <button className={'button'} onClick={() => this.resetSolution()}>
        <span>Clear</span>
      </button>
    ) : (
      <button className={'button'} onClick={() => this.solve()} disabled={!this.props.board.isValid}>
        <span>Solve!</span>
      </button>
    );
  }

  renderGenerateResetButton() {
    return this.props.board.isEmpty ? (
      <button className={'button'} onClick={() => this.newGame()}>
        <span>Generate</span>
      </button>
    ) : (
      <button className={'button'} onClick={() => this.resetBoard()}>
        <span>Reset</span>
      </button>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    NewGame: (args) => dispatch(NewGame()),
    Solve: (args) => dispatch(Solve(args)),
    Validate: (arg1, arg2) => dispatch(Validate(arg1, arg2)),
    ResetBoard: (args) => dispatch(resetBoard(args)),
    ResetSolution: (args) => dispatch(resetSolution(args)),
    dispatch
  };
}

function mapStateToProps(state){
  return { board: state.board }
}
export default connect(mapStateToProps, mapDispatchToProps)(SudokuGame)