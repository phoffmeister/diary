import axios from "axios";
import { createMessage, MERROR, MSUCCESS, MINFO } from "./messages";
import { tokenConfig } from "./auth";
import { GET_DAY, GET_ALL_DAYS, CREATE_DAY, SELECT_DATE } from "./types";

export const getDay = (dayID) => (dispatch, getState) => {
  axios
    .get(`/api/day/${dayID}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DAY,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(createMessage("cannot get day", MERROR)));
};

export const getAllDays = () => (dispatch, getState) => {
  axios
    .get(`/api/day/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_DAYS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(createMessage("couldnt get day entries", MERROR)));
};

export const createDay = (date) => (dispatch, getState) => {
  axios
    .post("/api/day/", date, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATE_DAY,
        payload: res.data,
      });
      dispatch(createMessage("DayEntry created", MSUCCESS));
    })
    .catch((err) =>
      dispatch(createMessage("Could not create DayEntry", MERROR))
    );
};
