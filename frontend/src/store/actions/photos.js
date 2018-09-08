import axios from "../../axios-api";
import { NotificationManager } from "react-notifications";
import { PHOTOS_FAILURE, FETCH_PHOTOS_SUCCESS } from "./actionType";

const fetchPhotosSuccess = photos => {
	return {type: FETCH_PHOTOS_SUCCESS, photos};
};

const photosFailure = error => {
	return {type: PHOTOS_FAILURE, error};
};

export const uploadPhoto = photo => {
	return (dispatch, getState) => {
		return axios.post("/photos", photo).then(
			response => { // eslint-disable-line no-unused-vars
				NotificationManager.success("Success", "Add photo successful");
				dispatch(fetchPhotos(getState().places.currentPlace._id));
			},
			error => {
				dispatch(photosFailure(error.response.data));
			}
		);
	};
};

export const fetchPhotos = id => {
	return dispatch => {
		return axios.get(`/photos/${id}`).then(
			response => {
				dispatch(fetchPhotosSuccess(response.data));
			},
			error => {
				dispatch(photosFailure(error.response.data));
			}
		);
	};
};

export const deletePhoto = id => {
	return (dispatch, getState) => {
		axios.delete(`/photos/${id}`).then(
			response => { // eslint-disable-line no-unused-vars
				dispatch(fetchPhotos(getState().places.currentPlace._id));
			},
			error => {
				dispatch(photosFailure(error.response.data));
			}
		);
	};
};