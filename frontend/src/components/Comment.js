import React from "react";
import moment from "moment";
import StarRatings from "react-star-ratings";
import "src/styles/Comment.scss";

const Comment = ({date, rateUser, comment, food, service, interior}) => {
	return (
		<div className="reviews_list_comment">
			<div className="reviews_list_comment_top">
				<span className="reviews_list_comment_top_date">On {moment(date).format("DD MMMM YYYY")}</span>
				<span className="reviews_list_comment_top_username">{rateUser.username}</span>
			</div>
			<div className="reviews_list_comment_description">{comment}</div>
			<div className="reviews_list_comment_rating">
				<div className="row flex flex--start">
					<div className="rating-title">Quality food:</div>
					<StarRatings
						rating={food}
						starRatedColor="red"
						starDimension="20px"
						starSpacing="1px"
					/>
				</div>
				<div className="row flex flex--start">
					<div className="rating-title">Service:</div>
					<StarRatings
						rating={service}
						starRatedColor="red"
						starDimension="20px"
						starSpacing="1px"
					/>
				</div>
				<div className="row flex flex--start">
					<div className="rating-title">Interior:</div>
					<StarRatings
						rating={interior}
						starRatedColor="red"
						starDimension="20px"
						starSpacing="1px"
					/>
				</div>
			</div>
		</div>
	);
};

export default Comment;
