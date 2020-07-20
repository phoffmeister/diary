import { combineReducers } from "redux";
import auth from "./auth";
import day from "./day";
import medication from "./medication";
import food from "./food";
import messages from "./messages";
import drink from "./drink";

export default combineReducers({
  auth,
  day,
  medication,
  food,
  drink,
  messages,
});
