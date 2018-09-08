import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addComment, fetchPlaceById, uploadPhoto, fetchComments, fetchPhotos } from "../store/actions";
import PropTypes from "prop-types";
import notFound from "src/assets/images/not-found.jpeg";
import config from "src/config";
import "src/styles/OnePlace.scss";
import { AddReviewForm, UploadPhoto, Gallery, Reviews, Ratings } from "src/components";

class OnePlace extends Component {
	
	static propTypes = {
		fetchPlaceById: PropTypes.func.isRequired,
		fetchComments: PropTypes.func.isRequired,
		fetchPhotos: PropTypes.func.isRequired,
		addComment: PropTypes.func.isRequired,
		uploadPhoto: PropTypes.func.isRequired,
		place: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		comments: PropTypes.array.isRequired,
		photos: PropTypes.array.isRequired,
	};
	
	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.fetchPlaceById(this.props.match.params.id);
			this.props.fetchComments(this.props.match.params.id);
			this.props.fetchPhotos(this.props.match.params.id);
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
				<Ratings average={this.props.place.average}/>
				{(this.props.photos && this.props.photos.length !== 0) ?
					<Gallery photos={this.props.photos}/>
					: null}
				{(this.props.comments && this.props.comments.length !== 0) ?
					<Reviews comments={this.props.comments}/>
					: null}
				<AddReviewForm submitReview={this.props.addComment} placeId={this.props.match.params.id}/>
				<UploadPhoto uploadPhotoHandler={this.props.uploadPhoto} placeId={this.props.match.params.id}/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	place: state.places.currentPlace,
	photos: state.photos.currentPhotos,
	comments: state.comments.currentComments,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchPlaceById,
		fetchComments,
		fetchPhotos,
		addComment,
		uploadPhoto,
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OnePlace);
