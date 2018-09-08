import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import "src/styles/Ratings.scss";

export default class Ratings extends Component {
	render() {
		const {avg, food, interior, service} = this.props.average;
		return (
			<div className="ratings">
				<h2>Ratings</h2>
				<div className="ratings_list">
					<div className="row flex flex--start">
						<div className="rating-title">Overall:</div>
						<StarRatings
							rating={avg}
							starRatedColor="red"
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Quality food:</div>
						<StarRatings
							rating={food}
							starRatedColor="red"
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Service:</div>
						<StarRatings
							rating={service}
							starRatedColor="red"
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Interior:</div>
						<StarRatings
							rating={interior}
							starRatedColor="red"
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
				</div>
			</div>
		);
	}
}
