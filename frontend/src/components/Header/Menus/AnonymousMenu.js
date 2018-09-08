import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class AnonymousMenu extends Component {
	render() {
		return (
			<ul className="header_menu">
				<li><NavLink exact to="/">Places</NavLink></li>
				<li><NavLink to="/login" exact>Sign In</NavLink></li>
				<li><NavLink to="/register" exact>Sign Up</NavLink></li>
			</ul>
		);
	}
}
