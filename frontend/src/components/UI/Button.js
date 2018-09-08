import React from "react";
import "../../styles/Button.scss";
import PropTypes from "prop-types";

const Button = ({children, btnClass, onClick}) => {
	return (
		<button onClick={onClick} className={["btn", btnClass].join(" ")}>{children}</button>
	);
};

Button.propTypes = {
	children: PropTypes.any.isRequired,
	btnClass: PropTypes.string,
	onClick: PropTypes.func
};

export default Button;
