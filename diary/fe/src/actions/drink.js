import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_DRINK_OPTS, GET_DAY } from "./types";
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

export const createDrink = (drinkEntry) => (dispatch, getState) => {
  axios
    .post("/api/drink/", drinkEntry, tokenConfig(getState))
    .then((res) => {
      axios
        .get(`/api/day/${res.data.collection}/`, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: GET_DAY,
            payload: res.data,
          });
          dispatch(createMessage("DrinkEntry created", MSUCCESS));
        })
        .catch((err) => dispatch(createMessage("cannot get day", MERROR)));
    })
    .catch((err) =>
      dispatch(createMessage("cannot create drink entry", MERROR))
    );
};
