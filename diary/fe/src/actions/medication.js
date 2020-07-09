import axios from 'axios';
import { tokenConfig } from './auth';
import { GET_MEDICATION_OPTS, GET_DAY } from './types';

export const getMedicationOpts = () => (dispatch, getState) => {
  axios
    .get('/api/opts/medication/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MEDICATION_OPTS,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
}

export const createMedication = medicationEntry => (dispatch, getState) => {
  axios
    .post('/api/medication/', medicationEntry, tokenConfig(getState))
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

