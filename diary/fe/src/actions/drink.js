import axios from "axios";
import { tokenConfig } from "./auth";
import { DELETE_DRINK_SUCCESS, GET_DRINK_OPTS, GET_DAY } from "./types";
import { createMessage, MERROR, MSUCCESS, MINFO } from "./messages";

export const getDrinkOpts = () => (dispatch, getState) => {
  axios
    .get("/api/opts/drink/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DRINK_OPTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(createMessage("cannot get drink options", MERROR))
    );
};

export const createDrink = (drinkEntry, successCallback) => (
  dispatch,
  getState
) => {
  axios
    .post("/api/drink/", drinkEntry, tokenConfig(getState))
    .then((res) => {
      axios
        .get(`/api/day/${res.data.day}/`, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: GET_DAY,
            payload: res.data,
          });
          dispatch(createMessage("DrinkEntry created", MSUCCESS));
          if (successCallback) successCallback();
        })
        .catch((err) => dispatch(createMessage("cannot get day", MERROR)));
    })
    .catch((err) =>
      dispatch(createMessage("cannot create drink entry", MERROR))
    );
};

export const deleteDrink = (drinkID) => (dispatch, getState) => {
  axios
    .delete(`/api/drink/${drinkID}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_DRINK_SUCCESS,
        payload: drinkID,
      });
      dispatch(createMessage("DrinkEntry deleted!", MSUCCESS));
    })
    .catch((err) =>
      dispatch(createMessage("cannot delete DrinkEntry", MERROR))
    );
};
