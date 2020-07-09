import { GET_MEDICATION_OPTS } from "../actions/types";

const initialState = {
  opts: {
      amounts: [],
      names: [],
  },
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_MEDICATION_OPTS:
      return {
        ...state,
        opts: action.payload
      };
    default:
      return state;
  }
}
