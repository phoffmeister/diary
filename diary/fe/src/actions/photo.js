
import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

export const createPhoto = (photoEntry, history) => (dispatch, getState) => {
  axios
    .post(`/api/photo/`, photoEntry, tokenConfig(getState))
    .then(res => {
        history.push(`/day/${res.data.collection}/`)
    })
    .catch((err) => console.log(err));
}

