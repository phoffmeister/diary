import { GET_DRINK_OPTS } from "../actions/types";

const initialState = {
  opts: {
    amounts: [],
    types: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DRINK_OPTS:
      return {
        ...state,
        opts: action.payload,
      };
    default:
      return state;
  }
}
