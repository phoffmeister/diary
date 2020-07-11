import { CREATE_MESSAGE, GET_ERRORS } from "./types";

export const MERROR = "ERROR";
export const MSUCCESS = "SUCCESS";
export const MINFO = "INFO";

let id = 1;

// CREATE MESSAGE
export const createMessage = (message, message_type) => {
  return {
    type: CREATE_MESSAGE,
    payload: {
      message,
      message_type,
      id: id++,
    },
  };
};
