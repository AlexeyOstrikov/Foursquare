import axios from "src/axios-api";
import { FETCH_COMMENTS_SUCCESS, ADD_COMMENT_FAILURE, FETCH_COMMENTS_FAILURE } from "./actionType";
import { NotificationManager } from "react-notifications";

const addCommentFailure = error => {
	return {type: ADD_COMMENT_FAILURE, error};
};

const fetchCommentFailure = error => {
	return {type: FETCH_COMMENTS_FAILURE, error};
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
				dispatch(fetchCommentFailure(error));
			}
		);
	};
};

export const addComment = comment => {
	return (dispatch, getState) => {
		return axios.post("/comments", comment).then(
			response => {
				NotificationManager.success("Success", "Create comment successful");
				dispatch(fetchComments(getState().places.currentPlace._id));
			},
			error => {
				dispatch(addCommentFailure(error));
			}
		);
	};
};