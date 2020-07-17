import {
  GET_DAY,
  CREATE_TEXT_SUCCESS,
  CREATE_PHOTO_SUCCESS,
  DELETE_TEXT_SUCCESS,
  DELETE_PHOTO_SUCCESS,
  DELETE_DRINK_SUCCESS,
  DELETE_FOOD_SUCCESS,
  DELETE_MEDICATION_SUCCESS,
} from "../actions/types";

const initialState = {
  day: {
    date: "",
    id: 0,
    texts: [],
    medications: [],
    drinks: [],
    photos: [],
    foods: [],
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
    case DELETE_MEDICATION_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          medications: state.day.medications.filter(
            (e) => e.id != action.payload
          ),
        },
      };
    case DELETE_FOOD_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          foods: state.day.foods.filter((e) => e.id != action.payload),
        },
      };
    case DELETE_DRINK_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          drinks: state.day.drinks.filter((e) => e.id != action.payload),
        },
      };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          photos: state.day.photos.filter((e) => e.id != action.payload),
        },
      };
    case DELETE_TEXT_SUCCESS:
      return {
        ...state,
        day: {
          ...state.day,
          texts: state.day.texts.filter((e) => e.id != action.payload),
        },
      };
    default:
      return state;
  }
}
