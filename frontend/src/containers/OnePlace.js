import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	addComment,
	fetchPlaceById,
	uploadPhoto,
	fetchComments,
	fetchPhotos,
	deleteComment,
	deletePhoto,
	deleteErrors,
} from "../store/actions";
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
		deletePhoto: PropTypes.func.isRequired,
		addComment: PropTypes.func.isRequired,
		deleteErrors: PropTypes.func.isRequired,
		uploadPhoto: PropTypes.func.isRequired,
		deleteComment: PropTypes.func.isRequired,
		place: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		user: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		comments: PropTypes.array.isRequired,
		photos: PropTypes.array.isRequired,
		error: PropTypes.any,
		errorPhotos: PropTypes.any,
	};
	
	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.fetchPlaceById(this.props.match.params.id);
			this.props.fetchComments(this.props.match.params.id);
			this.props.fetchPhotos(this.props.match.params.id);
		}
		this.props.deleteErrors();
	}
	
	isNotCommitted = () => {
		if (this.props.user) {
			const index = this.props.comments.findIndex(comment =>
				comment.rateUser._id === this.props.user._id);
			return index === -1;
		}
	};
	
	render() {
		const {description, title, image, average} = this.props.place;
		if (!average) return (<div>Loading...</div>);
		
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
				<Ratings average={average}/>
				{(this.props.photos && this.props.photos.length !== 0) &&
				<Gallery
					deletePhoto={this.props.deletePhoto}
					user={this.props.user}
					photos={this.props.photos}/>
				}
				{(this.props.comments && this.props.comments.length !== 0) &&
				<Reviews
					deleteReview={this.props.deleteComment}
					user={this.props.user}
					comments={this.props.comments}/>
				}
				{this.props.user &&
				<Fragment>
					{this.isNotCommitted() ?
						<AddReviewForm
							error={this.props.error}
							submitReview={this.props.addComment}
							placeId={this.props.match.params.id}/>
						: <div className="one-place-page_message">Delete your review to make reviews!!!</div>
					}
					<UploadPhoto
						errorPhotos={this.props.errorPhotos}
						uploadPhotoHandler={this.props.uploadPhoto}
						placeId={this.props.match.params.id}/>
				</Fragment>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	place: state.places.currentPlace,
	photos: state.photos.currentPhotos,
	comments: state.comments.currentComments,
	user: state.user.user,
	error: state.errors.commentsError,
	errorPhotos: state.errors.photosError,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchPlaceById,
		fetchComments,
		fetchPhotos,
		addComment,
		uploadPhoto,
		deleteComment,
		deletePhoto,
		deleteErrors,
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OnePlace);
