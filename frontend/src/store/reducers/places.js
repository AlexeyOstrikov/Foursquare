import {
	FETCH_PLACE_BY_ID_SUCCESS,
	FETCH_PLACES_SUCCESS
} from "../actions/actionType";
import merge from "xtend";

const initialState = {
	places: [],
	currentPlace: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PLACES_SUCCESS:
			return merge(state, {places: action.places});
		case FETCH_PLACE_BY_ID_SUCCESS:
			return merge(state, {currentPlace: action.place});
		default:
			return state;
		
	}
};

export default reducer;