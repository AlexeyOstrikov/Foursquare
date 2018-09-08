import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AnonymousMenu, UserMenu } from "src/components";
import "src/styles/Header.scss";

export default class Header extends Component {
	static propTypes = {
		user: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		logout: PropTypes.func.isRequired,
	};
	
	render() {
		return (
			<header className="header">
				<div className="header_container">
					<NavLink className="header_logo" exact to="/">Foursquare</NavLink>
					{this.props.user ?
						<UserMenu logout={this.props.logout} user={this.props.user}/> :
						<AnonymousMenu/>
					}
				</div>
			</header>
		);
	}
}
