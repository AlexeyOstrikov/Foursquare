import React from "react";
import notFound from "src/assets/images/not-found.jpeg";
import config from "src/config";

const Place = ({title, description, image}) => {
	let background = `url(${notFound})`;
	
	if (image) background = `url(${config.apiUrl}uploads/${image})`;
	return (
		<li className="one-place">
			<div className="one-place_image" style={{ background }}/>
		</li>
	);
};

export default Place;
