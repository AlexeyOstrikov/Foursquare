import axios from "src/axios-api";
import {
	FETCH_COMMENTS_SUCCESS,
	COMMENT_FAILURE,
} from "./actionType";
import { NotificationManager } from "react-notifications";
import { fetchPlaceById } from "./places";

const commentFailure = error => {
	return {type: COMMENT_FAILURE, error};
};

const fetchCommentSuccess = comments => {
	return {type: FETCH_COMMENTS_SUCCESS, comments};
};

export const fetchComments = id => {
	return dispatch => {
		return axios.get(`/comments/${id}`).then(
			response => {
				dispatch(fetchCommentSuccess(response.data));
			},
			error => {
				dispatch(commentFailure(error.response.data));
			}
		);
	};
};

export const addComment = comment => {
	return (dispatch, getState) => {
		return axios.post("/comments", comment).then(
			response => { // eslint-disable-line no-unused-vars
				NotificationManager.success("Success", "Create comment successful");
				dispatch(fetchComments(getState().places.currentPlace._id));
				dispatch(fetchPlaceById(getState().places.currentPlace._id));
			},
			error => {
				dispatch(commentFailure(error.response.data));
			}
		);
	};
};

export const deleteComment = id => {
	return (dispatch, getState) => {
		axios.delete(`/comments/${id}`).then(
			response => { // eslint-disable-line no-unused-vars
				dispatch(fetchComments(getState().places.currentPlace._id));
				dispatch(fetchPlaceById(getState().places.currentPlace._id));
			},
			error => {
				dispatch(commentFailure(error.response.data));
			}
		);
	};
};