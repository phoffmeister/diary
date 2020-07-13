import axios from "axios";
import { createMessage, MERROR, MSUCCESS, MINFO } from "./messages";
import { tokenConfig } from "./auth";
import { DELETE_TEXT_SUCCESS, CREATE_TEXT_SUCCESS } from "./types";

export const createText = (textEntry, successCallback) => (
  dispatch,
  getState
) => {
  axios
    .post("/api/text/", textEntry, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATE_TEXT_SUCCESS,
        payload: res.data,
      });
      dispatch(createMessage("TextEntry created!", MSUCCESS));
      if (successCallback) successCallback();
    })
    .catch((err) => dispatch(createMessage("cannot create TextEntry", MERROR)));
};

export const deleteText = (textID) => (dispatch, getState) => {
  axios
    .delete(`/api/text/${textID}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_TEXT_SUCCESS,
        payload: textID,
      });
      dispatch(createMessage("TextEntry deleted!", MSUCCESS));
    })
    .catch((err) => dispatch(createMessage("cannot delete TextEntry", MERROR)));
};
