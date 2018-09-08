import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AddPlace, LoginPage, RegisterPage, Places, OnePlace } from "src/containers";

const ProtectRoute = ({isAllowed, ...props}) => (
	isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
);

const Routes = ({user}) => {
	return (
		<Switch>
			<Route path="/login" exact component={LoginPage}/>
			<Route path="/register" exact component={RegisterPage}/>
			<Route exact path="/" component={Places}/>
			<ProtectRoute exact isAllowed={user} path="/add" component={AddPlace}/>
			<ProtectRoute exact isAllowed={user} path="/place/:id" component={OnePlace}/>
		</Switch>
	);
};

export default Routes;
