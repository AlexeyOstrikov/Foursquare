import React, {Component} from "react";
import PropTypes from "prop-types";
import notFound from "../assets/images/not-found.jpeg";
import config from "../config";
import "src/styles/Gallery.scss";

class Gallery extends Component {
	static propTypes = {
		photos: PropTypes.array.isRequired,
	};
	
	renderPhoto = ({photo, _id}) => {
		let background = `url(${notFound})`;
		
		if (photo) background = `url(${config.apiUrl}uploads/${photo})`;
		return (
			<div key={_id} className="gallery_list_photo"
				 style={{background: `${background} center center / cover no-repeat`}}
			/>
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
