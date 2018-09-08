import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import "src/styles/Ratings.scss";

export default class Ratings extends Component {
	render() {
		return (
			<div className="ratings">
				<h2>Ratings</h2>
				<div className="ratings_list">
					<div className="row flex flex--start">
						<div className="rating-title">Overall:</div>
						<StarRatings
							rating={2}
							starRatedColor="red"
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Quality food:</div>
						<StarRatings
							rating={3}
							starRatedColor="red"
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Service:</div>
						<StarRatings
							rating={4}
							starRatedColor="red"
							starDimension="30px"
							starSpacing="3px"
						/>
					</div>
					<div className="row flex flex--start">
						<div className="rating-title">Interior:</div>
						<StarRatings
							rating={2}
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
