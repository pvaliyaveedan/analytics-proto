import { combineReducers } from "redux";
import ProgressReducer from "Components/_Progress/ProgressReducer";
import LoginReducer from "Components/Login/LoginReducer";

export default combineReducers({
    Progress: ProgressReducer,
    Login: LoginReducer,
});
