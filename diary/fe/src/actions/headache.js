import axios from "axios";
import { tokenConfig } from "./auth";
import { DELETE_HEADACHE_SUCCESS, GET_HEADACHE_TAGS, GET_DAY } from "./types";
import { createMessage, MERROR, MSUCCESS, MINFO } from "./messages";

export const getHeadacheTags = () => (dispatch, getState) => {
  axios
    .get("/api/opts/headache/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_HEADACHE_TAGS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(createMessage("cannot get headache tags", MERROR))
    );
};

export const createHeadache = (headacheEntry, successCallback) => (
  dispatch,
  getState
) => {
  axios
    .post("/api/headache/", headacheEntry, tokenConfig(getState))
    .then((res) => {
      axios
        .get(`/api/day/${res.data.day}/`, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: GET_DAY,
            payload: res.data,
          });
          dispatch(createMessage("HeadacheEntry created!", MSUCCESS));
          if (successCallback) successCallback();
        })
        .catch((err) => dispatch(createMessage("cannot get day", MERROR)));
    })
    .catch((err) =>
      dispatch(createMessage("cannot create headache entry", MERROR))
    );
};

export const deleteHeadache = (headacheID) => (dispatch, getState) => {
  axios
    .delete(`/api/headache/${headacheID}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_HEADACHE_SUCCESS,
        payload: headacheID,
      });
      dispatch(createMessage("HeadacheEntry deleted!", MSUCCESS));
    })
    .catch((err) =>
      dispatch(createMessage("cannot delete HeadacheEntry", MERROR))
    );
};
