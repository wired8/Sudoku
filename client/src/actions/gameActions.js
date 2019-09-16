import { NEW_GAME, ENTER_VALUE, SOLUTION_CHECK, SOLVE, VALIDATE, RESET_BOARD, RESET_SOLUTION } from './types';

export const newGame = (startBoard, emptyBoard, errorCells) => {
  return {
    type: NEW_GAME, startBoard, errorCells
  };
};

export const enterValue = (array_index, value) => {
  return {
    type: ENTER_VALUE, array_index, value
  };
};

export const solutionCheck = (currentBoard, solutionBoard) => {
  return {
    type: SOLUTION_CHECK
  };
};

export const solve = (currentBoard) => {
  return {
    type: SOLVE, currentBoard
  };
};

export const validate = (array_index, errorCells) => {
  return {
    type: VALIDATE, array_index, errorCells
  };
};

export const resetBoard = () => {
  return {
    type: RESET_BOARD
  };
};

export const resetSolution = (originalBoard) => {
  return {
    type: RESET_SOLUTION, originalBoard
  };
};

