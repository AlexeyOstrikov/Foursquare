import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaSignOutAlt, FaUser } from "react-icons/fa/index";

export default class UserMenu extends Component {
	static propTypes = {
		user: PropTypes.object,
		logout: PropTypes.func.isRequired,
	};
	
	render() {
		return (
			<Fragment>
				<ul className="header_menu">
					<li><NavLink exact to="/">Places</NavLink></li>
					<li><NavLink exact to="/add">Add place</NavLink></li>
				</ul>
				<div className="header_additional-block">
					<div className="username-block"><FaUser/> <span>{this.props.user.username}</span></div>
					<button className="btn-sign-out" onClick={this.props.logout}><FaSignOutAlt/> <span>Sign Out</span></button>
				</div>
			</Fragment>
		);
	}
};