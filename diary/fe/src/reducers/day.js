import {
  GET_DAY,
  CREATE_TEXT_SUCCESS,
  CREATE_PHOTO_SUCCESS,
} from "../actions/types";

const initialState = {
  day: {
    date: "",
    id: 0,
    texts: [],
    medications: [],
    drinks: [],
    photos: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DAY:
      return {
        day: action.payload,
      };
    case CREATE_TEXT_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          texts: [...state.day.texts, action.payload],
        },
      };
    case CREATE_PHOTO_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          photos: [...state.day.photos, action.payload],
        },
      };
    default:
      return state;
  }
}
