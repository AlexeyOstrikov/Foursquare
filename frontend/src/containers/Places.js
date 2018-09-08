import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlaces } from "../store/actions";
import PropTypes from "prop-types";
import { Place } from "src/components";

class Places extends Component {
	
	static propTypes = {
		fetchPlaces: PropTypes.func.isRequired,
		places: PropTypes.array.isRequired,
		_id: PropTypes.any.isRequired,
	};
	
	componentDidMount() {
		this.props.fetchPlaces();
	}
	
	renderPlace = place => <Place key={place._id} {...place}/>;
	
	render() {
		return (
			<ul>
				{this.props.places.map(this.renderPlace)}
			</ul>
		);
	}
}

const mapStateToProps = state => ({
	places: state.places.places,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchPlaces,
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Places);