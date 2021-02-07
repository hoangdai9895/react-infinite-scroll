import { SET_CURRENT_USER } from "../../types/index";

const initialState = {
	isAuthenticated: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return { ...state, isAuthenticated: action.payload };
		default:
			return state;
	}
}
