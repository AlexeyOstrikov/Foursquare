import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changePlaceRating, fetchPlaceById } from "../store/actions";
import PropTypes from "prop-types";
import notFound from "src/assets/images/not-found.jpeg";
import config from "src/config";
import "src/styles/OnePlace.scss";
import { AddReviewForm } from "src/components";

class OnePlace extends Component {
	
	static propTypes = {
		fetchPlaceById: PropTypes.func.isRequired,
		changePlaceRating: PropTypes.func.isRequired,
		place: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
	};
	
	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.fetchPlaceById(this.props.match.params.id);
		}
	}
	
	render() {
		const {place: {description, title, image}} = this.props;
		let img = `url(${notFound})`;
		
		if (image) img = `${config.apiUrl}uploads/${image}`;
		return (
			<div className="one-place-page">
				<div className="one-place-page_top">
					<div className="one-place-page_top_left-side">
						<h1 className="one-place-page_top_left-side_title">{title}</h1>
						<div className="one-place-page_top_left-side_description">{description}</div>
					</div>
					<div className="one-place-page_top_right-side">
						<img src={img} alt="place-image"/>
					</div>
				</div>
				<AddReviewForm submitReview={this.props.changePlaceRating} placeId={this.props.match.params.id}/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	place: state.places.currentPlace,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchPlaceById,
		changePlaceRating
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OnePlace);
