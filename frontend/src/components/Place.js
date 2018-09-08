import React from "react";
import notFound from "src/assets/images/not-found.jpeg";
import config from "src/config";
import "src/styles/Place.scss";
import PropTypes from "prop-types";

const Place = ({title, clickHandler, image}) => {
	let background = `url(${notFound})`;
	
	if (image) background = `url(${config.apiUrl}uploads/${image})`;
	return (
		<li className="one-place">
			<div onClick={clickHandler} className="one-place_image"
				 style={{background: `${background} center center / cover no-repeat`}}/>
			<div onClick={clickHandler} className="one-place_title">{title}</div>
		</li>
	);
};

Place.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	clickHandler: PropTypes.func.isRequired
};

export default Place;
