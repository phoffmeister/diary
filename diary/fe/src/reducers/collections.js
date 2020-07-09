import { CREATE_COLLECTION, GET_COLLECTIONS } from "../actions/types";

const initialState = {
  collections: [],
}

export default function (state=initialState, action) {
  switch(action.type) {
    case CREATE_COLLECTION:
      const unsorted_collection = [ ...state.collections, action.payload, ]
      const sorted_collection = unsorted_collection.slice().sort((a,b) => b.date > a.date);
      return {
        ...state,
        collections: sorted_collection,
      };
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    default:
      return state;
  }
}
