import axios from "axios";
import { tokenConfig } from "./auth";
import {
  DELETE_MEDICATION_SUCCESS,
  GET_MEDICATION_OPTS,
  GET_DAY,
} from "./types";
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

export const createMedication = (medicationEntry, successCallback) => (
  dispatch,
  getState
) => {
  axios
    .post("/api/medication/", medicationEntry, tokenConfig(getState))
    .then((res) => {
      axios
        .get(`/api/day/${res.data.day}/`, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: GET_DAY,
            payload: res.data,
          });
          dispatch(createMessage("MedicationEntry created!", MSUCCESS));
          if (successCallback) successCallback();
        })
        .catch((err) => dispatch(createMessage("cannot get day", MERROR)));
    })
    .catch((err) => dispatch(createMessage("cannot create med entry", MERROR)));
};

export const deleteMedication = (medicationID) => (dispatch, getState) => {
  axios
    .delete(`/api/medication/${medicationID}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_MEDICATION_SUCCESS,
        payload: medicationID,
      });
      dispatch(createMessage("MedicationEntry deleted!", MSUCCESS));
    })
    .catch((err) =>
      dispatch(createMessage("cannot delete MedicationEntry", MERROR))
    );
};
