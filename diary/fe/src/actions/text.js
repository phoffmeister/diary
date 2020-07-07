import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { CREATE_TEXT } from './types';

export const createText = (textEntry) => (dispatch, getState) => {
  axios
    .post('/api/text/', textEntry,  tokenConfig(getState))
    .then(res => {
    })
    .catch((err) => console.log(err));
}
