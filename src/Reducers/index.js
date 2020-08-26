  
import { combineReducers } from "redux";
import userInformationReducer from "./userInformation.reducer";

const AppReducer = combineReducers({
  userInformationReducer,
});

export default AppReducer;