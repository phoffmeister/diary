import {
  GET_DAY,
  GET_ALL_DAYS,
  CREATE_TEXT_SUCCESS,
  CREATE_PHOTO_SUCCESS,
  DELETE_TEXT_SUCCESS,
  DELETE_PHOTO_SUCCESS,
  DELETE_DRINK_SUCCESS,
  DELETE_FOOD_SUCCESS,
  DELETE_MEDICATION_SUCCESS,
  CREATE_DAY,
} from "../actions/types";

const initialState = {
  dayDetail: {
    date: "",
    id: 0,
    texts: [],
    medications: [],
    drinks: [],
    photos: [],
    foods: [],
  },
  dayList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DAY:
      return {
        dayList: [],
        dayDetail: action.payload,
      };
    case CREATE_TEXT_SUCCESS:
      return {
        ...state,
        dayDetail: {
          ...state.dayDetail,
          texts: [...state.dayDetail.texts, action.payload],
        },
      };
    case CREATE_PHOTO_SUCCESS:
      return {
        ...state,
        dayDetail: {
          ...state.dayDetail,
          photos: [...state.dayDetail.photos, action.payload],
        },
      };
    case DELETE_MEDICATION_SUCCESS:
      return {
        ...state,
        dayDetail: {
          ...state.dayDetail,
          medications: state.dayDetail.medications.filter(
            (e) => e.id != action.payload
          ),
        },
      };
    case DELETE_FOOD_SUCCESS:
      return {
        ...state,
        dayDetail: {
          ...state.dayDetail,
          foods: state.dayDetail.foods.filter((e) => e.id != action.payload),
        },
      };
    case DELETE_DRINK_SUCCESS:
      return {
        ...state,
        dayDetail: {
          ...state.dayDetail,
          drinks: state.dayDetail.drinks.filter((e) => e.id != action.payload),
        },
      };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        dayDetail: {
          ...state.dayDetail,
          photos: state.dayDetail.photos.filter((e) => e.id != action.payload),
        },
      };
    case DELETE_TEXT_SUCCESS:
      return {
        ...state,
        dayDetail: {
          ...state.dayDetail,
          texts: state.dayDetail.texts.filter((e) => e.id != action.payload),
        },
      };
    case CREATE_DAY:
      const unsorted_days = [...state.dayList, action.payload];
      const sorted_days = unsorted_days.slice().sort((a, b) => b.date > a.date);
      return {
        ...state,
        dayList: sorted_days,
      };
    case GET_ALL_DAYS:
      return {
        dayDetail: {
          date: "",
          id: 0,
          texts: [],
          medications: [],
          drinks: [],
          photos: [],
          foods: [],
        },
        dayList: action.payload,
      };
    default:
      return state;
  }
}
