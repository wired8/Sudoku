import { NEW_GAME, ENTER_VALUE, SOLVE, VALIDATE } from '../actions/types';

export default function boardReducer(state = {}, action) {
  switch (action.type) {
    case NEW_GAME: {
      const { type, startBoard, errorCells } = action;
      return { ...state, currentBoard: [...startBoard], startBoard, errorCells: errorCells, solved: false }
    }

    case SOLVE: {
      const { type, currentBoard } = action;
      return { ...state, currentBoard: currentBoard, errorCells: [], solved: false }
    }

    case VALIDATE: {
      const { type, errorCells } = action;
      return { ...state, errorCells: errorCells, solved: false }
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