import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { CREATE_TEXT_SUCCESS } from './types';

export const createText = textEntry => (dispatch, getState) => {
  axios
    .post('/api/text/', textEntry,  tokenConfig(getState))
    .then(res => {
        dispatch({
          type: CREATE_TEXT_SUCCESS,
          payload: res.data
        });
    })
    .catch((err) => console.log(err));
}
