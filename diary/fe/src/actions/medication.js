import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_MEDICATION_OPTS, GET_DAY } from "./types";
import { createMessage, MERROR, MSUCCESS, MINFO } from "./messages";

export const getMedicationOpts = () => (dispatch, getState) => {
  axios
    .get("/api/opts/medication/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_MEDICATION_OPTS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(createMessage("cannot get med opts", MERROR)));
};

export const createMedication = (medicationEntry) => (dispatch, getState) => {
  axios
    .post("/api/medication/", medicationEntry, tokenConfig(getState))
    .then((res) => {
      axios
        .get(`/api/day/${res.data.collection}/`, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: GET_DAY,
            payload: res.data,
          });
          dispatch(createMessage("MedicationEntry created!", MSUCCESS));
        })
        .catch((err) => dispatch(createMessage("cannot get day", MERROR)));
    })
    .catch((err) => dispatch(createMessage("cannot create med entry", MERROR)));
};
