import { NEW_GAME, ENTER_VALUE, SOLUTION_CHECK, GET_SCORE } from './types'

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

export const getScore = (scores) => {
  return {
    type: GET_SCORE, scores
  }
};