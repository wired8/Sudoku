import { NEW_GAME, ENTER_VALUE, SOLVE, VALIDATE, RESET_BOARD, RESET_SOLUTION } from '../actions/types';

const emptyBoard = [0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0, +
                    0,0,0,0,0,0,0,0,0,];

export default function boardReducer(state = {}, action) {
  switch (action.type) {
    case NEW_GAME: {
      const { type, startBoard, errorCells } = action;
      return { ...state, currentBoard: [...startBoard], originalBoard: [...startBoard], emptyBoard: [...emptyBoard],
        solvedCells: [...startBoard], errorCells: errorCells, solved: false, isValid: true, isEmpty: false }
    }

    case SOLVE: {
      const { type, currentBoard } = action;
      return { ...state, currentBoard: currentBoard, errorCells: [], solved: true, isValid: true, isEmpty: false }
    }

    case VALIDATE: {
      const { type, array_index, errorCells } = action;
      const errors = errorCells ? errorCells.filter(x => x === true).length : 0;
      const completed = state.currentBoard.filter(x => x !== 0).length;
      const solved = errors === 0 && completed === 81;
      let solvedCells = state.solvedCells;
      solvedCells[array_index] = true;
      return { ...state, errorCells: errorCells, solvedCells: solvedCells, solved: solved, isValid: errors === 0, isEmpty: completed === 0}
    }

    case ENTER_VALUE: {
      const { type, array_index, value } = action;
      let newBoard = state.currentBoard;
      newBoard[array_index] = value;
      return { ...state, currentBoard: newBoard, isValid: true }
    }

    case RESET_BOARD: {
      const { type } = action;
      return { ...state, currentBoard: [...emptyBoard], originalBoard: [...emptyBoard], errorCells: [], solvedCells: [], solved: false, isValid: true, isEmpty: true }
    }

    case RESET_SOLUTION: {
      const { type, originalBoard } = action;
      return { ...state, currentBoard: [...originalBoard], errorCells: [], solved: false, isValid: true, isEmpty: false }
    }

    default:
      return state
  }
}