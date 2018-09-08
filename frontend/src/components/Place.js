import React from "react";
import notFound from "src/assets/images/not-found.jpeg";
import config from "src/config";
import "src/styles/Place.scss";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import { MdPhotoCamera, MdDelete } from "react-icons/md/index";
import { Button } from "src/components";

const Place = ({quantityPhotos, title, clickHandler, image, average: {avg}, user, deletePlace, _id}) => {
	let background = `url(${notFound})`;
	if (image) background = `url(${config.apiUrl}uploads/${image})`;
	return (
		<li className="one-place">
			{(user && user.role === "admin") && <Button onClick={() => deletePlace(_id)} btnClass="one-place_delete delete"><MdDelete/></Button>}
			<div onClick={clickHandler} className="one-place_image"
				 style={{background: `${background} center center / cover no-repeat`}}/>
			<div onClick={clickHandler} className="one-place_title">{title}</div>
			<div className="one-place_rating">
				<StarRatings
					rating={avg}
					starRatedColor="gold"
					starDimension="30px"
					starSpacing="3px"
				/>
			</div>
			<div className="one-place_photos"><MdPhotoCamera/> <span>{quantityPhotos} photo</span></div>
		</li>
	);
};

Place.propTypes = {
	title: PropTypes.string.isRequired,
	_id: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	average: PropTypes.object.isRequired,
	clickHandler: PropTypes.func.isRequired,
	deletePlace: PropTypes.func.isRequired,
	quantityPhotos: PropTypes.number.isRequired,
	user: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
};

export default Place;
