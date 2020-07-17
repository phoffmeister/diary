import axios from "axios";
import { tokenConfig } from "./auth";
import { DELETE_FOOD_SUCCESS, GET_FOOD_TAGS, GET_DAY } from "./types";
import { createMessage, MERROR, MSUCCESS, MINFO } from "./messages";

export const getFoodTags = () => (dispatch, getState) => {
  axios
    .get("/api/opts/food/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_FOOD_TAGS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(createMessage("cannot get food tags", MERROR)));
};

export const createFood = (foodEntry, successCallback) => (
  dispatch,
  getState
) => {
  axios
    .post("/api/food/", foodEntry, tokenConfig(getState))
    .then((res) => {
      axios
        .get(`/api/day/${res.data.collection}/`, tokenConfig(getState))
        .then((res) => {
          dispatch({
            type: GET_DAY,
            payload: res.data,
          });
          dispatch(createMessage("FoodEntry created!", MSUCCESS));
          if (successCallback) successCallback();
        })
        .catch((err) => dispatch(createMessage("cannot get day", MERROR)));
    })
    .catch((err) =>
      dispatch(createMessage("cannot create food entry", MERROR))
    );
};

export const deleteFood = (foodID) => (dispatch, getState) => {
  axios
    .delete(`/api/food/${foodID}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_FOOD_SUCCESS,
        payload: foodID,
      });
      dispatch(createMessage("FoodEntry deleted!", MSUCCESS));
    })
    .catch((err) => dispatch(createMessage("cannot delete FoodEntry", MERROR)));
};
