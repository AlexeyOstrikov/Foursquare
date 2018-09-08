import axios from "../../axios-api";
import { NotificationManager } from "react-notifications";
import { ADD_PHOTO_FAILURE, FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS_FAILURE } from "./actionType";

const addPhotoFailure = error => {
	return {type: ADD_PHOTO_FAILURE, error};
};

const fetchPhotosSuccess = photos => {
	return {type: FETCH_PHOTOS_SUCCESS, photos};
};

const fetchPhotosFailure = error => {
	return {type: FETCH_PHOTOS_FAILURE, error};
};


export const uploadPhoto = photo => {
	return (dispatch, getState) => {
		return axios.post("/photos", photo).then(
			response => {
				NotificationManager.success("Success", "Add photo successful");
				dispatch(fetchPhotos(getState().places.currentPlace._id));
			},
			error => {
				dispatch(addPhotoFailure(error));
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
				dispatch(fetchPhotosFailure(error));
			}
		);
	};
};