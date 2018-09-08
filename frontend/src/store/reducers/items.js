import {
	FETCH_ITEM_BY_ID_SUCCESS,
	FETCH_ITEMS_SUCCESS
} from "../actions/actionType";
import merge from "xtend";

const initialState = {
	items: [],
	currentItem: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ITEMS_SUCCESS:
			return merge(state, {categories: action.items});
		case FETCH_ITEM_BY_ID_SUCCESS:
			return merge(state, {currentCategory: action.item});
		default:
			return state;
		
	}
};

export default reducer;