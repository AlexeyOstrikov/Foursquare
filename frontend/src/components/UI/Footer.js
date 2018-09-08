import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "src/styles/Footer.scss";

const Footer = () => (
	<footer className="footer">
		<div className="footer_container">
			<NavLink className="footer_logo" exact to="/">Foursquare</NavLink>
			<p>© {moment().year()}</p>
		</div>
	</footer>
);

export default Footer;
