import { CREATE_MESSAGE, GET_ERRORS } from "./types";

let id = 1;

// CREATE MESSAGE
export const createMessage = msg => {
    return {
        type: CREATE_MESSAGE,
        payload: {
            message: msg,
            id: id++
        }
    };
};
