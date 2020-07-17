import { combineReducers } from "redux";
import auth from "./auth";
import collections from "./collections";
import day from "./day";
import medication from "./medication";
import food from "./food";
import messages from "./messages";
import drink from "./drink";

export default combineReducers({
  auth,
  collections,
  day,
  medication,
  food,
  drink,
  messages,
});
