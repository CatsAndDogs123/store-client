import sort from '../utils/bubbleSort';
import axios from 'axios';

const getFinishedAndUnfinishedGames = async () => {
  const res = await axios.get('/api/games');
  sort(res.data);
  const fetchedGames = [];
  let unFinishedGame;
  console.log(res.data);
  for (let key in res.data) {
    if (res.data[key].gameId.isEndGame) {
      fetchedGames.push({
        ...res.data[key].gameId
      });
    } else {
      unFinishedGame = res.data[key].gameId;
    }
  }
  return { fetchedGames, unFinishedGame };
};

const postNewGameAndGetId = async (
  listOfMovesAndNumber,
  board,
  score,
  name,
  date,
  isEndGame
) => {
  const data = {
    listOfMovesAndNumber,
    board: board,
    score: score,
    name: name,
    date: date,
    isEndGame: isEndGame
  };
  const res = await axios.post('/api/games/postGame', data);
  return res.data.currentGameId;
};

const updateCurrentGame = async (
  listOfMovesAndNumber,
  board,
  score,
  name,
  date,
  isEndGame,
  id
) => {
  const data = {
    listOfMovesAndNumber,
    board: board,
    score: score,
    name: name,
    date: date,
    isEndGame: isEndGame,
    id: id //new test
  };
  console.log('sended', data);
  const res = await axios.patch('/api/games/updatesGames', data);
};

const deleteGameById = async id => {
  const res = await axios.delete('/api/games/deletesGames/' + id);
};

const getGameById = async id => {
  const res = await axios.get('/api/games/' + id);
  return res.data;
};

export {
  getFinishedAndUnfinishedGames,
  postNewGameAndGetId,
  updateCurrentGame,
  deleteGameById,
  getGameById
};
