import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "src/registerServiceWorker";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "react-router-redux";
import configureStore, { history } from "src/store/configureStore";
import App from "src/App";
import axios from "src/axios-api";
import "src/styles/style.scss";

const {persistor, store} = configureStore();

axios.interceptors.request.use(config => {
	try {
		config.headers["Token"] = store.getState().user.token;
	} catch (e) {
		// do nothing
	}
	return config;
});

const LoadingView = () => (
	<div>Loading</div>
);

const app = (
	<Provider store={store}>
		<PersistGate loading={<LoadingView/>} persistor={persistor}>
			<ConnectedRouter history={history}>
				<App/>
			</ConnectedRouter>
		</PersistGate>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
