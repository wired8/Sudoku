import { NEW_GAME, ENTER_VALUE, SOLUTION_CHECK, SOLVE, VALIDATE } from './types'

export const newGame = (startBoard, errorCells) => {
  return {
    type: NEW_GAME, startBoard, errorCells
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
    type: SOLVE, currentBoard
  }
};

export const validate = (errorCells) => {
  return {
    type: VALIDATE, errorCells
  }
};


