import { newGame, solve, validate } from '../../actions/gameActions.js';

const apiUrl = process.env.NODE_ENV === 'production' ? 'https://sudokuapi.wired8.com' : 'http://localhost:3001';

export function NewGame() {
  return (dispatch) => {
    dispatch({ type: 'GET_NEW_BOARD' });
    return fetch(`${apiUrl}/api/v1/game`)
      .then(response => response.json())
      .then((json) => dispatch(newGame(json.board)));
  };
}

export function Solve(puzzle) {
  return (dispatch) => {
    dispatch({ type: 'SOLVE' });
    const e = encodeURIComponent(puzzle);
    const requestBody = `puzzle=${e}`;
    return fetch(`${apiUrl}/api/v1/game/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: requestBody
    })
      .then(response => response.json())
      .then((json) => dispatch(solve(json.board)));
  };
}

export function Validate(index, puzzle) {
  return (dispatch) => {
    dispatch({ type: 'VALIDATE' });
    const e = encodeURIComponent(puzzle);
    const requestBody = `puzzle=${e}`;
    return fetch(`${apiUrl}/api/v1/game/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: requestBody
    })
      .then(response => response.json())
      .then((json) => dispatch(validate(index, json.errors)));
  };
}