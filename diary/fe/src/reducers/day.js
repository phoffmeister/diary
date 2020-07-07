import { GET_DAY } from "../actions/types";

const initialState = {
  day: {
    date:"",
    id:0,
    texts:[],
    medications:[],
    drinks:[],
    photos:[],
  },
}

export default function (state=initialState, action) {
  switch(action.type) {
    case GET_DAY:
      return {
        ...state,
        day: action.payload
      };
    default:
      return state;
  }
}
