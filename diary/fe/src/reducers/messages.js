import { CREATE_MESSAGE } from "../actions/types";

const initialState = {
  message: "",
  message_type: "",
  id: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return {
        message: action.payload.message,
        message_type: action.payload.message_type,
        id: action.payload.id,
      };
    default:
      return state;
  }
}
