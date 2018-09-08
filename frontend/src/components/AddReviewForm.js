import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { Button, TextArea } from "src/components";
import "src/styles/AddReviewForm.scss";
import PropTypes from "prop-types";

export default class AddReviewForm extends Component {
	
	static propTypes = {
		placeId: PropTypes.any.isRequired,
		submitReview: PropTypes.func.isRequired,
	};
	
	state = {
		comment: "",
		food: 0,
		service: 0,
		interior: 0,
		placeId: this.props.placeId,
	};
	
	inputChangeHandler = event => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	};
	
	submitFormHandler = event => {
		event.preventDefault();
		this.props.submitReview(this.state).then(() => {
			this.setState({
				comment: "",
				food: 0,
				service: 0,
				interior: 0,
				placeId: this.props.placeId,
			});
		});
	};
	
	changeRating = (value, name) => this.setState({[name]: value});
	
	render() {
		return (
			<div className="add-review-form">
				<h2>Add review</h2>
				<form onSubmit={this.submitFormHandler}>
					<div className="row">
						<TextArea name="comment" onChange={this.inputChangeHandler} value={this.state.comment}/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Quality food:</div>
						<StarRatings
							rating={this.state.food}
							starHoverColor="red"
							starRatedColor="red"
							changeRating={this.changeRating}
							numberOfStars={5}
							name='food'
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Service:</div>
						<StarRatings
							rating={this.state.service}
							starHoverColor="red"
							starRatedColor="red"
							changeRating={this.changeRating}
							numberOfStars={5}
							name='service'
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Interior:</div>
						<StarRatings
							rating={this.state.interior}
							starHoverColor="red"
							starRatedColor="red"
							changeRating={this.changeRating}
							numberOfStars={5}
							name='interior'
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--end">
						<Button>Submit review</Button>
					</div>
				</form>
			</div>
		);
	}
}
