import axios from "../../axios-api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import {
	ADD_PLACE_FAILURE,
	FETCH_PLACE_BY_ID_FAILURE,
	FETCH_PLACE_BY_ID_SUCCESS,
	FETCH_PLACES_FAILURE,
	FETCH_PLACES_SUCCESS
} from "./actionType";

const addPlaceFailure = (error) => {
	return {type: ADD_PLACE_FAILURE, error};
};

const fetchPlacesSuccess = places => {
	return {type: FETCH_PLACES_SUCCESS, places};
};

const fetchPlacesFailure = error => {
	return {type: FETCH_PLACES_FAILURE, error};
};

const fetchPlaceByIdSuccess = place => {
	return {type: FETCH_PLACE_BY_ID_SUCCESS, place};
};

const fetchPlaceByIdFailure = error => {
	return {type: FETCH_PLACE_BY_ID_FAILURE, error};
};

export const addPlace = (place) => {
	return dispatch => {
		return axios.post("/places", place).then(
			response => { // eslint-disable-line no-unused-vars
				NotificationManager.success("Success", "Create successful");
				dispatch(push("/"));
			},
			error => {
				dispatch(addPlaceFailure(error));
			}
		);
	};
};

export const fetchPlaces = () => {
	return dispatch => {
		axios.get("/places").then(response => {
			dispatch(fetchPlacesSuccess(response.data));
		}, error => {
			dispatch(fetchPlacesFailure(error));
		});
	};
};

export const fetchPlaceById = id => {
	return dispatch => {
		return axios.get(`/places/${id}`).then(
			response => dispatch(fetchPlaceByIdSuccess(response.data),
				error => dispatch(fetchPlaceByIdFailure(error)))
		);
	};
};