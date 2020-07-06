import { GET_COLLECTIONS } from "../actions/types";

const initialState = {
  collections: [],
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    default:
      return state;
  }
}
