import { combineReducers } from "redux";
import day from './day';
import auth from './auth';
import messages from './messages';
import collections from './collections';

export default combineReducers({
  day,
  messages,
  collections,
  auth
});
