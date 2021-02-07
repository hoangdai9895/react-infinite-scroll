import { combineReducers } from "redux";
import authReducer from "./auth/auth.reduce";

export default combineReducers({
	auth: authReducer,
});
