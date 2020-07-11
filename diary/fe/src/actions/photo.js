import axios from "axios";
import { createMessage, MERROR, MSUCCESS, MINFO } from "./messages";
import { tokenConfig } from "./auth";
import { CREATE_PHOTO_SUCCESS } from "./types";

export const createPhoto = (photoEntry) => (dispatch, getState) => {
  axios
    .post(`/api/photo/`, photoEntry, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATE_PHOTO_SUCCESS,
        payload: res.data,
      });
      dispatch(createMessage("PhotoEntry created!", MSUCCESS));
    })
    .catch((err) =>
      dispatch(createMessage("cannot create PhotoEntry", MERROR))
    );
};
