import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { FaImage } from "react-icons/fa/index";
import { Input, Button, TextArea } from "src/components";
import notFound from "src/assets/images/not-found.jpeg";
import "src/styles/Add.scss";
import { addItem } from "../store/actions";

class Add extends Component {
	static propTypes = {
		addItem: PropTypes.func.isRequired,
	};
	
	state = {
		item: {
			name: "",
			phone: "",
			address: "",
			description: "",
			category: null,
			image: "",
		},
		preview: null,
	};
	
	inputChangeHandler = event => {
		const {name, value} = event.target;
		this.setState({item: {...this.state.item, [name]: value}});
	};
	
	selectChangeHandler = category => {
		this.setState({item: {...this.state.item, category}});
	};
	
	fileChangeHandler = event => {
		const {files, name} = event.target;
		if (files && files[0]) {
			let reader = new FileReader();
			reader.onload = (event) => this.setState({preview: event.target.result});
			reader.readAsDataURL(files[0]);
		}
		this.setState({item: {...this.state.item, [name]: files[0]}});
	};
	
	submitFormHandler = event => {
		event.preventDefault();
		const formData = new FormData();
		const {item} = this.state;
		Object.keys(this.state.item).forEach(key => {
			key === "category" ? formData.append(key, item[key].label) : formData.append(key, item[key]);
		});
		this.props.addItem(formData);
	};
	
	render() {
		const options = [
			{label: "Friends", value: 1},
			{label: "Colleagues", value: 2},
			{label: "Family", value: 3},
			{label: "Guys", value: 4},
			{label: "Girls", value: 5},
		];
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
									value={this.state.item.name}
									onChange={this.inputChangeHandler}
									name="name"
									type="text"
									labelText="Name"
								/>
							</div>
							<div className="row">
								<Input
									value={this.state.item.phone}
									onChange={this.inputChangeHandler}
									name="phone"
									type="text"
									labelText="Phone"
								/>
							</div>
							<div className="row">
								<Select
									name="category"
									value={this.state.item.category}
									onChange={this.selectChangeHandler}
									options={options}
									placeholder="Select category"
								/>
							</div>
							<div className="row">
								<TextArea
									onChange={this.inputChangeHandler}
									value={this.state.item.address}
									name="address"
									labelText="Address"
								/>
							</div>
							<div className="row">
								<TextArea
									onChange={this.inputChangeHandler}
									value={this.state.item.description}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		addItem,
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
