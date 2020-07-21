import { GET_HEADACHE_TAGS } from "../actions/types";

const initialState = {
  tags: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HEADACHE_TAGS:
      return { ...state, tags: action.payload.tags };
    default:
      return state;
  }
}
