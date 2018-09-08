import {
	FETCH_COMMENTS_SUCCESS,
} from "../actions/actionType";
import merge from "xtend";

const initialState = {
	currentComments: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COMMENTS_SUCCESS:
			return merge(state, {currentComments: action.comments});
		default:
			return state;
		
	}
};

export default reducer;