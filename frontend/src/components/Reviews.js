import React, { Component } from "react";
import PropTypes from "prop-types";
import { Comment } from "src/components";

export default class Reviews extends Component {
	static propTypes = {
		comments: PropTypes.array.isRequired,
	};
	
	renderComment = comment => <Comment key={comment._id} {...comment}/>;
	
	render() {
		return (
			<div className="reviews">
				<h2>Reviews</h2>
				<ul className="reviews_list">
					{this.props.comments.map(this.renderComment)}
				</ul>
			</div>
		);
	}
}
