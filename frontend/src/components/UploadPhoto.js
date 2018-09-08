import React, { Component } from "react";
import { FaImage } from "react-icons/fa";
import { Button } from "./index";
import notFound from "../assets/images/not-found.jpeg";
import "src/styles/UploadPhoto.scss";
import PropTypes from "prop-types";

export default class UploadPhoto extends Component {
	
	static propTypes = {
		placeId: PropTypes.any.isRequired,
		uploadPhotoHandler: PropTypes.func.isRequired,
	};
	
	state = {
		upload: {
			photo: null,
			placeId: this.props.placeId,
		},
		preview: null,
	};
	
	fileChangeHandler = event => {
		const {files} = event.target;
		if (files && files[0]) {
			let reader = new FileReader();
			reader.onload = (event) => this.setState({preview: event.target.result});
			reader.readAsDataURL(files[0]);
		}
		this.setState({upload: {...this.state.upload, photo: files[0]}});
	};
	
	submitFormHandler = event => {
		event.preventDefault();
		const formData = new FormData();
		const {upload} = this.state;
		Object.keys(upload).forEach(key => {
			formData.append(key, upload[key]);
		});
		this.props.uploadPhotoHandler(formData);
	};
	
	render() {
		return (
			<div className="upload-photo">
				<h2>Upload photo</h2>
				<div className="upload-photo-form">
					<div className="upload-photo-form_preview">
						<img className="upload-photo-form_preview_image" src={this.state.preview || notFound}
							 alt="avatar"/>
					</div>
					<form onSubmit={this.submitFormHandler}>
						<div className="upload-photo-form_buttons">
							<label style={{marginRight: 40}} className="btn-label" htmlFor="image"><FaImage/><span>Choose photo</span></label>
							<input id="image"
								   hidden
								   onChange={this.fileChangeHandler}
								   type="file"/>
							<Button>Upload photo</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
