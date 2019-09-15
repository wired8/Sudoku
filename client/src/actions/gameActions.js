import { NEW_GAME, ENTER_VALUE, SOLUTION_CHECK, SOLVE } from './types'

export const newGame = (startBoard) => {
  return {
    type: NEW_GAME, startBoard
  }
};

export const enterValue = (array_index, value) => {
  return {
    type: ENTER_VALUE, array_index, value
  }
};

export const solutionCheck = (currentBoard, solutionBoard) => {
  return {
    type: SOLUTION_CHECK
  }
};

export const solve = (currentBoard) => {
  return {
    type: SOLVE
  }
};

