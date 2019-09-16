import { NEW_GAME, ENTER_VALUE, SOLVE, VALIDATE } from '../actions/types';

export default function boardReducer(state = {}, action) {
  switch (action.type) {
    case NEW_GAME: {
      const { type, startBoard, errorCells } = action;
      return { ...state, currentBoard: [...startBoard], originalBoard: [...startBoard], errorCells: errorCells, solved: false }
    }

    case SOLVE: {
      const { type, currentBoard } = action;
      return { ...state, currentBoard: currentBoard, errorCells: [], solved: true }
    }

    case VALIDATE: {
      const { type, errorCells } = action;
      const errors = errorCells ? errorCells.filter(x => x === true).length : -1;
      const completed = state.currentBoard.filter(x => x !== 0).length;
      const solved = errors === 0 && completed === 81;
      return { ...state, errorCells: errorCells, solved: solved }
    }

    case ENTER_VALUE: {
      const { type, array_index, value } = action;
      let newBoard = state.currentBoard;
      newBoard[array_index] = value;
      return { ...state, currentBoard: newBoard }
    }

    default:
      return state
  }
}