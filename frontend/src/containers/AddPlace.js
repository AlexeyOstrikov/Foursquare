import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { FaImage } from "react-icons/fa/index";
import { Input, Button, TextArea } from "src/components";
import notFound from "src/assets/images/not-found.jpeg";
import "src/styles/Add.scss";
import { addPlace } from "../store/actions";

class AddPlace extends Component {
	static propTypes = {
		addPlace: PropTypes.func.isRequired,
	};
	
	state = {
		place: {
			title: "",
			description: "",
			image: "",
		},
		preview: null,
	};
	
	inputChangeHandler = event => {
		const {name, value} = event.target;
		this.setState({place: {...this.state.place, [name]: value}});
	};
	
	fileChangeHandler = event => {
		const {files, name} = event.target;
		if (files && files[0]) {
			let reader = new FileReader();
			reader.onload = (event) => this.setState({preview: event.target.result});
			reader.readAsDataURL(files[0]);
		}
		this.setState({place: {...this.state.place, [name]: files[0]}});
	};
	
	submitFormHandler = event => {
		event.preventDefault();
		const formData = new FormData();
		const {place} = this.state;
		Object.keys(place).forEach(key => {
			formData.append(key, place[key]);
		});
		this.props.addPlace(formData);
	};
	
	render() {
		return (
			<div className="add-page">
				<h1>Add</h1>
				<div className="add-page_container">
					<div className="add-page_preview">
						<img className="add-page_preview_image" src={this.state.preview || notFound} alt="avatar"/>
						<label className="btn-label" htmlFor="image"><FaImage/><span>Add photo</span></label>
						<input id="image"
							   hidden
							   name="image"
							   onChange={this.fileChangeHandler}
							   type="file"/>
					</div>
					<div className="add-page_form">
						<form onSubmit={this.submitFormHandler}>
							<div className="row">
								<Input
									value={this.state.place.title}
									onChange={this.inputChangeHandler}
									name="title"
									type="text"
									labelText="Title"
								/>
							</div>
							<div className="row">
								<TextArea
									onChange={this.inputChangeHandler}
									value={this.state.place.description}
									name="description"
									labelText="Description"
								/>
							</div>
							<div className="row flex flex--end">
								<Button>Create</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		addPlace,
	},
	dispatch);
};

export default connect(null, mapDispatchToProps)(AddPlace);
