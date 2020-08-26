  
import { combineReducers } from "redux";
import currentUserReducer from "./currentUserReducer";

const AppReducer = combineReducers({
  currentUserReducer,
});

export default AppReducer;