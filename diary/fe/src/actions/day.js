import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_DAY } from './types';

export const getDay = (dayID) => (dispatch, getState) => {
  axios
    .get(`/api/day/${dayID}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_DAY,
        payload: res.data
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

