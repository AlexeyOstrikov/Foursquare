import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlaces, deletePlace } from "../store/actions";
import PropTypes from "prop-types";
import { Place } from "src/components";
import "src/styles/Places.scss";

class Places extends Component {
	
	static propTypes = {
		fetchPlaces: PropTypes.func.isRequired,
		deletePlace: PropTypes.func.isRequired,
		places: PropTypes.array.isRequired,
		history: PropTypes.object.isRequired,
		user: PropTypes.object,
	};
	
	componentDidMount() {
		this.props.fetchPlaces();
	}
	
	goOnePlacePage = id => {
		this.props.history.push(`/place/${id}`);
	};
	
	renderPlace = place => {
		const {_id} = place;
		return <Place
			user={this.props.user}
			deletePlace={this.props.deletePlace}
			clickHandler={() => this.goOnePlacePage(_id)}
			key={_id} {...place}/>;
	};
	
	render() {
		return (
			<Fragment>
				<h1>All places</h1>
				<ul className="places-list">
					{this.props.places.map(this.renderPlace)}
				</ul>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	places: state.places.places,
	user: state.user.user,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchPlaces,
		deletePlace,
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Places);