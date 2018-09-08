import {
	FETCH_PLACE_BY_ID_SUCCESS,
	FETCH_PLACES_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	PLACE_FAILURE,
	COMMENT_FAILURE,
	PHOTOS_FAILURE, DELETE_ERRORS,
} from "../actions/actionType";
import merge from "xtend";

const initialState = {
	registerError: null,
	loginError: null,
	placesError: null,
	commentsError: null,
	photosError: null,
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
		case PLACE_FAILURE:
			return merge(state, {placesError: action.error});
		case FETCH_PLACES_SUCCESS:
			return merge(state, {placesError: null});
		case FETCH_PLACE_BY_ID_SUCCESS:
			return merge(state, {placesError: null});
		case COMMENT_FAILURE:
			return merge(state, {commentsError: action.error});
		case PHOTOS_FAILURE:
			return merge(state, {photosError: action.error});
		case DELETE_ERRORS:
			return merge(state, {
				registerError: null,
				loginError: null,
				placesError: null,
				commentsError: null,
				photosError: null,
			});
		default:
			return state;
	}
};

export default reducer;