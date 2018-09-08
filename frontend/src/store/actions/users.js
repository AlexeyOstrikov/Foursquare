import axios from "../../axios-api";
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import {
	LOGOUT_USER,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
} from "./actionType";

const registerUserSuccess = () => {
	return {type: REGISTER_USER_SUCCESS};
};

const registerUserFailure = error => {
	return {type: REGISTER_USER_FAILURE, error};
};

const loginUserSuccess = (user, token) => {
	return {type: LOGIN_USER_SUCCESS, user, token};
};

const loginUserFailure = error => {
	return {type: LOGIN_USER_FAILURE, error};
};

export const registerUser = userData => {
	return dispatch => {
		axios.post("/users", userData).then(
			response => { // eslint-disable-line no-unused-vars
				dispatch(registerUserSuccess());
				dispatch(push("/login"));
				NotificationManager.success("Success", "Registration successful");
			},
			error => {
				dispatch(registerUserFailure(error.response.data));
			}
		);
	};
};

export const loginUser = userData => {
	return dispatch => {
		return axios.post("/users/sessions", userData).then(
			response => {
				dispatch(loginUserSuccess(response.data.user, response.data.token));
				dispatch(push("/"));
				NotificationManager.success("Success", response.data.message);
			},
			error => {
				const errorObj = error.response ? error.response.data : {error: "No internet"};
				dispatch(loginUserFailure(errorObj));
			}
		);
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		axios.delete("/users/sessions").then(
			response => { // eslint-disable-line no-unused-vars
				dispatch({type: LOGOUT_USER});
				dispatch(push("/"));
				NotificationManager.success("Success", "Logout successful");
			}, error => { // eslint-disable-line no-unused-vars
				NotificationManager.error("Error", "Could not logout");
			}
		);
	};
};
