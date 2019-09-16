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
    this.props.Solve(this.props.board.originalBoard);
  }

  onCellValueEdited(row, col, value) {
    const index = (row * 9) + col;
    if (!this.isInt(value)) {
      value = 0;
    }
    this.props.dispatch(enterValue(index, parseInt(value, 10)));
    this.props.Validate(this.props.board.currentBoard);
  }

  newGame() {
    this.props.NewGame();
  }

  isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
  }

  render() {
    return (
      <div className="heading">
        <h1>Sudoku</h1>
        <SudukoBoard
          onCellValueChange={this.onCellValueEdited.bind(this)}
        />
        <div className={'buttons-container'}>
          <button className={'button'} onClick={() => this.solve()}><span>Solve!</span></button>
          <button className={'button'} onClick={() => this.newGame()}><span>New Game</span></button>
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