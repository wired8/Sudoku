import { newGame } from '../../actions/gameActions.js';

export function NewGame() {
  return (dispatch) => {
    dispatch({ type: 'GET_NEW_BOARD' });
    return fetch('http://localhost:3001/api/v1/game')
      .then(response => response.json())
      .then((json) => dispatch(newGame(json.board)));
  };
}