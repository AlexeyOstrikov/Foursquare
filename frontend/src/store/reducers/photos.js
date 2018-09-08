import {
	FETCH_PHOTOS_SUCCESS,
} from "../actions/actionType";
import merge from "xtend";

const initialState = {
	currentPhotos: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PHOTOS_SUCCESS:
			return merge(state, {currentPhotos: action.photos});
		default:
			return state;
		
	}
};

export default reducer;