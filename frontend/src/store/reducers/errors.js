import {
	ADD_ITEM_FAILURE,
	FETCH_ITEM_BY_ID_FAILURE,
	FETCH_ITEM_BY_ID_SUCCESS,
	FETCH_ITEMS_FAILURE,
	FETCH_ITEMS_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
} from "../actions/actionType";
import merge from "xtend";

const initialState = {
	registerError: null,
	loginError: null,
	itemsError: null,
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
		case FETCH_ITEMS_FAILURE:
			return merge(state, {itemsError: action.error});
		case ADD_ITEM_FAILURE:
			return merge(state, {itemsError: action.error});
		case FETCH_ITEM_BY_ID_FAILURE:
			return merge(state, {itemsError: action.error});
		case FETCH_ITEMS_SUCCESS:
			return merge(state, {itemsError: null});
		case FETCH_ITEM_BY_ID_SUCCESS:
			return merge(state, {itemsError: null});
		default:
			return state;
	}
};

export default reducer;