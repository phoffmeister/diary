import { combineReducers } from "redux";
import auth from "./auth";
import day from "./day";
import medication from "./medication";
import food from "./food";
import headache from "./headache";
import messages from "./messages";
import drink from "./drink";

export default combineReducers({
  auth,
  day,
  medication,
  food,
  headache,
  drink,
  messages,
});
