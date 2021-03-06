import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { FaImage } from "react-icons/fa/index";
import { Input, Button, TextArea } from "src/components";
import notFound from "src/assets/images/not-found.jpeg";
import "src/styles/AddPlace.scss";
import { addPlace, deleteErrors } from "../store/actions";

class AddPlace extends Component {
	static propTypes = {
		addPlace: PropTypes.func.isRequired,
		deleteErrors: PropTypes.func.isRequired,
		error: PropTypes.any,
	};
	
	componentDidMount() {
		this.props.deleteErrors();
	}
	
	state = {
		place: {
			title: "",
			description: "",
			image: "",
		},
		preview: null,
		checked: false
	};
	
	inputChangeHandler = event => {
		const {name, value} = event.target;
		this.setState({place: {...this.state.place, [name]: value}});
	};
	
	checkboxChangeHandler = event => {
		this.setState({checked: event.target.checked});
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
		this.props.addPlace(formData, this.state.checked);
	};
	
	render() {
		const style = this.props.error ? { borderColor: "#ff0000" } : {};
		return (
			<div className="add-page">
				<h1>Add place</h1>
				<div className="add-page_container">
					<div className="add-page_preview">
						<img style={style} className="add-page_preview_image" src={this.state.preview || notFound} alt="avatar"/>
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
									style={style}
								/>
							</div>
							<div className="row">
								<TextArea
									onChange={this.inputChangeHandler}
									value={this.state.place.description}
									name="description"
									labelText="Description"
									style={style}
								/>
							</div>
							<div className="row flex">
								<div className="add-page_form_checkbox">
									<input
										style={style}
										onChange={this.checkboxChangeHandler}
										checked={this.state.checked}
										name="checkbox"
										id="checkbox"
										hidden
										type="checkbox"/>
									<label style={style} className="input-label" htmlFor="checkbox"/>
									<label>I understand</label>
								</div>
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
		deleteErrors,
	},
	dispatch);
};

const mapStateToProps = state => ({
	error: state.errors.placesError
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);
