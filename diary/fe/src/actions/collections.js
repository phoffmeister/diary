import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { CREATE_COLLECTION, SELECT_DATE, GET_COLLECTIONS } from "./types";

export const getCollections = () => (dispatch, getState) => {
    axios
        .get(`/api/collection/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COLLECTIONS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const createCollection = date => (dispatch, getState) => {
    axios
        .post("/api/collection/", date, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CREATE_COLLECTION,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
