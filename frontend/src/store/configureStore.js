import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistCombineReducers, persistStore } from "redux-persist";
import itemsReducer from "./reducers/items";
import userReducer from "./reducers/user";
import errorsReducer from "./reducers/errors";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();

const middleware = [
	thunkMiddleware,
	routerMiddleware(history),
];

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["errors"]
};

const rootReducer = persistCombineReducers(persistConfig, {
	items: itemsReducer,
	user: userReducer,
	errors: errorsReducer,
	routing: routerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

export default () => {
	const store = createStore(rootReducer, enhancers);
	const persistor = persistStore(store);
	return {store, persistor};
};