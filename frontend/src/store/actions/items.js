import axios from "../../axios-api";
import {
	ADD_ITEM_FAILURE,
	FETCH_ITEM_BY_ID_FAILURE,
	FETCH_ITEM_BY_ID_SUCCESS,
	FETCH_ITEMS_FAILURE,
	FETCH_ITEMS_SUCCESS
} from "./actionType";

const addCategoryFailure = (error) => {
	return {type: ADD_ITEM_FAILURE, error};
};

const fetchItemsSuccess = items => {
	return {type: FETCH_ITEMS_SUCCESS, items};
};

const fetchItemsFailure = error => {
	return {type: FETCH_ITEMS_FAILURE, error};
};

const fetchCategoryByIdSuccess = item => {
	return {type: FETCH_ITEM_BY_ID_SUCCESS, item};
};

const fetchCategoryByIdFailure = error => {
	return {type: FETCH_ITEM_BY_ID_FAILURE, error};
};

export const addItem = (item) => {
	console.log(item);
	return dispatch => {
		return axios.post("/items", item).then(
			response => dispatch(fetchItems()), // eslint-disable-line no-unused-vars
			error => dispatch(addCategoryFailure(error))
		);
	};
};

export const deleteItem = id => {
	return dispatch => {
		axios.delete(`/items/${id}`).then(
			() => dispatch(fetchItems())
		);
	};
};

export const editItem = (id, item) => {
	return dispatch => {
		return axios.put(`/items/${id}`, item).then(
			response => dispatch(fetchItems()), // eslint-disable-line no-unused-vars
			error => {
				console.log(error);
			});
	};
};

export const fetchItems = () => {
	return dispatch => {
		axios.get("/items").then(response => {
			dispatch(fetchItemsSuccess(response.data));
		}, error => {
			dispatch(fetchItemsFailure(error));
		});
	};
};

export const fetchItemById = id => {
	return dispatch => {
		return axios.get(`/items/${id}`).then(
			response => dispatch(fetchCategoryByIdSuccess(response.data),
				error => dispatch(fetchCategoryByIdFailure(error)))
		);
	};
};