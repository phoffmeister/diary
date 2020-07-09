import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_DRINK_OPTS, GET_DAY } from './types';

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

export const createDrink = drinkEntry => (dispatch, getState) => {
  axios
    .post('/api/drink/', drinkEntry, tokenConfig(getState))
    .then(res => {
      axios
        .get(`/api/day/${res.data.collection}/`, tokenConfig(getState))
        .then(res => {
          dispatch({
            type: GET_DAY,
            payload: res.data
          });
    })
    .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

