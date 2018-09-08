import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistCombineReducers, persistStore } from "redux-persist";
import placesReducer from "./reducers/places";
import userReducer from "./reducers/user";
import errorsReducer from "./reducers/errors";
import photosReducer from "./reducers/photos";
import commentsReducer from "./reducers/comments";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();

const middleware = [
	thunkMiddleware,
	routerMiddleware(history),
];

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["errors, photos, comments"]
};

const rootReducer = persistCombineReducers(persistConfig, {
	places: placesReducer,
	user: userReducer,
	errors: errorsReducer,
	photos: photosReducer,
	comments: commentsReducer,
	routing: routerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

export default () => {
	const store = createStore(rootReducer, enhancers);
	const persistor = persistStore(store);
	return {store, persistor};
};