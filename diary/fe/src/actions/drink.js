import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_DRINK_OPTS } from './types';

export const getDrinkOpts = () => (dispatch, getState) => {
  axios
    .get('/api/opts/drink/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_DRINK_OPTS,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
}

export const createDrink = (drinkEntry, history) => (dispatch, getState) => {
  axios
    .post('/api/drink/', drinkEntry, tokenConfig(getState))
    .then(res => {
        history.push(`/day/${res.data.collection}/`)
    })
    .catch((err) => console.log(err));
}

