import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { GET_MEDICATION_OPTS } from './types';

export const getMedicationOpts = () => (dispatch, getState) => {
  axios
    .get('/api/opts/medication/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MEDICATION_OPTS,
        payload: res.data
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const createMedication = (medicationEntry, history) => (dispatch, getState) => {
  axios
    .post('/api/medication/', medicationEntry, tokenConfig(getState))
    .then(res => {
        history.push(`/day/${res.data.collection}/`)
    })
    .catch((err) => console.log(err));
}

