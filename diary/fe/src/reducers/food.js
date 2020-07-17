import { GET_FOOD_TAGS } from "../actions/types";

const initialState = {
  tags: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FOOD_TAGS:
      return { ...state, tags: action.payload.tags };
    default:
      return state;
  }
}
