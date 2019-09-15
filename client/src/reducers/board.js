import { NEW_GAME, ENTER_VALUE, SOLVE } from '../actions/types';

export default function boardReducer(state = {}, action) {
  switch (action.type) {
    case NEW_GAME: {
      const { type, startBoard } = action;
      return { ...state, currentBoard: [...startBoard], startBoard, start_time: Date.now(), end_time: null, solved: false }
    }

    case SOLVE: {
      const { type, currentBoard } = action;
      return { ...state, currentBoard: currentBoard, start_time: Date.now(), end_time: null, solved: false }
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