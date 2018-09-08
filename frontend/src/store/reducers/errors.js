import {
	ADD_PLACE_FAILURE,
	FETCH_PLACE_BY_ID_FAILURE,
	FETCH_PLACE_BY_ID_SUCCESS,
	FETCH_PLACES_FAILURE,
	FETCH_PLACES_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
} from "../actions/actionType";
import merge from "xtend";

const initialState = {
	registerError: null,
	loginError: null,
	placesError: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return merge(state, {registerError: null});
		case REGISTER_USER_FAILURE:
			return merge(state, {registerError: action.error});
		case LOGIN_USER_SUCCESS:
			return merge(state, {loginError: null});
		case LOGIN_USER_FAILURE:
			return merge(state, {loginError: action.error});
		case FETCH_PLACES_FAILURE:
			return merge(state, {placesError: action.error});
		case ADD_PLACE_FAILURE:
			return merge(state, {placesError: action.error});
		case FETCH_PLACE_BY_ID_FAILURE:
			return merge(state, {placesError: action.error});
		case FETCH_PLACES_SUCCESS:
			return merge(state, {placesError: null});
		case FETCH_PLACE_BY_ID_SUCCESS:
			return merge(state, {placesError: null});
		default:
			return state;
	}
};

export default reducer;