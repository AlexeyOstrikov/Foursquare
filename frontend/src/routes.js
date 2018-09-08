import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Add, LoginPage, RegisterPage, Items } from "src/containers";

const ProtectRoute = ({isAllowed, ...props}) => (
	isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
);

const Routes = ({user}) => {
	return (
		<Switch>
			<Route path="/login" exact component={LoginPage}/>
			<Route path="/register" exact component={RegisterPage}/>
			<Route exact path="/" component={Items}/>
			<ProtectRoute exact isAllowed={user} path="/add" component={Add}/>
		</Switch>
	);
};

export default Routes;
