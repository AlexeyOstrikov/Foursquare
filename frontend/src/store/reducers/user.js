import {
	LOGIN_USER_SUCCESS,
	LOGOUT_USER,
	REGISTER_USER_SUCCESS,
} from "../actions/actionType";

const initialState = {
	user: null,
	token: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {...state, registerError: null};
		case LOGIN_USER_SUCCESS:
			return {...state, user: action.user, token: action.token};
		case LOGOUT_USER:
			return {...state, user: null};
		default:
			return state;
	}
};

export default reducer;