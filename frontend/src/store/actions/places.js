import axios from "../../axios-api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import {
	PLACE_FAILURE,
	FETCH_PLACE_BY_ID_SUCCESS,
	FETCH_PLACES_SUCCESS
} from "./actionType";

const placeFailure = (error) => {
	return {type: PLACE_FAILURE, error};
};

const fetchPlacesSuccess = places => {
	return {type: FETCH_PLACES_SUCCESS, places};
};

const fetchPlaceByIdSuccess = place => {
	return {type: FETCH_PLACE_BY_ID_SUCCESS, place};
};

export const addPlace = (place, checked) => {
	return dispatch => {
		return axios.post(`/places?checked=${checked}`, place).then(
			response => { // eslint-disable-line no-unused-vars
				NotificationManager.success("Success", "Create successful");
				dispatch(push("/"));
			},
			error => {
				dispatch(placeFailure(error.response.data));
			}
		);
	};
};

export const fetchPlaces = () => {
	return dispatch => {
		axios.get("/places").then(response => {
			dispatch(fetchPlacesSuccess(response.data));
		}, error => {
			dispatch(placeFailure(error));
		});
	};
};

export const fetchPlaceById = id => {
	return dispatch => {
		return axios.get(`/places/${id}`).then(
			response => dispatch(fetchPlaceByIdSuccess(response.data),
				error => dispatch(placeFailure(error)))
		);
	};
};

export const deletePlace = id => {
	return dispatch => {
		axios.delete(`/places/${id}`).then(
			response => { // eslint-disable-line no-unused-vars
				dispatch(fetchPlaces());
			},
			error => {
				dispatch(placeFailure(error));
			}
		);
	};
};