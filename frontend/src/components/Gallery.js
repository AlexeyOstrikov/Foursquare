import React, {Component} from "react";
import PropTypes from "prop-types";
import notFound from "../assets/images/not-found.jpeg";
import config from "../config";
import "src/styles/Gallery.scss";
import { Button } from "./index";
import { MdDelete } from "react-icons/md";

class Gallery extends Component {
	static propTypes = {
		photos: PropTypes.array.isRequired,
		deletePhoto: PropTypes.func.isRequired,
		user: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
	};
	
	renderPhoto = ({photo, _id}) => {
		let background = `url(${notFound})`;
		const {user} = this.props;
		if (photo) background = `url(${config.apiUrl}uploads/${photo})`;
		return (
			<div key={_id} className="gallery_list_photo"
				 style={{background: `${background} center center / cover no-repeat`}}>
				{(user && user.role === "admin") &&
					<Button onClick={() => this.props.deletePhoto(_id)} btnClass="gallery_list_photo_delete delete"><MdDelete/></Button>
				}
			</div>
		);
	};
	
	render(){
		return (
			<div className="gallery">
				<h2>Gallery</h2>
				<ul className="gallery_list">
					{this.props.photos.map(this.renderPhoto)}
				</ul>
			</div>
		);
	}
}

export default Gallery;
