import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

export const createText = (textEntry, history) => (dispatch, getState) => {
  axios
    .post('/api/text/', textEntry,  tokenConfig(getState))
    .then(res => {
        history.push(`/day/${res.data.collection}/`)
    })
    .catch((err) => console.log(err));
}
